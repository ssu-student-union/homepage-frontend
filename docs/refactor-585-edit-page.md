# Issue #585: 수정/작성 페이지 일반화

## 변경 의도

### 문제

4개 수정 페이지(자료집, 인권신고, 건의게시판-sug, 건의게시판-qna)에 동일한 코드가 반복되고 있었습니다.

- 로딩 스켈레톤 (`PageSkeleton` 함수) — 4개 페이지에서 동일한 JSX 복붙
- 에러 표시 블록 — 4개 페이지에서 동일한 JSX 복붙
- 등록 버튼 영역 (`ArticleFooter` + `Button` + `Loader2`) — 4개 페이지에서 10~15줄 복붙
- 헤더 영역 (`ArticleHeader` + `<h1>`) — 페이지마다 직접 조립
- 에디터 셋업 (`useRef` + `useContentEditor` + `isPostLoaded` + `handleContentChange` + `handleContentBlur`) — 3개 페이지에서 ~20줄 복붙
- 파일 첨부 상태 (`useState<PostFile[]>` + `handleFilesChange` + 기존 파일 로드 변환) — 3개 페이지에서 ~15줄 복붙
- 제출 시 파일/이미지 수집 (로컬 파일 업로드 → 이미지 처리 → ID 합치기) — 2개 페이지에서 ~10줄 복붙

새 수정/작성 페이지를 만들 때마다 이 보일러플레이트를 복사해야 했고, 각 페이지의 import 목록과 구조가 제각각이어서 어떤 페이지를 참고해야 할지 알기 어려웠습니다.

### 목표

1. **공통 UI 조각을 공유 컴포넌트로 추출** — 새 페이지를 만들 때 조립만 하면 되도록
2. **반복되는 에디터/파일 plumbing을 훅으로 추출** — 에디터 관심사끼리, 파일 관심사끼리 자연스러운 응집 단위로 묶기
3. **일관된 페이지 구조(레시피)를 확립** — 어떤 수정 페이지를 열어도 같은 섹션 순서로 읽히도록
4. **기존 동작은 100% 유지** — 로직, 유효성 검증, API 호출, 라우팅 전부 변경 없음

### 기각된 접근과 이유

초기에는 `EditPage` Provider + `EditContext` + compound component(`EditEditorSection`, `EditFileUploader`) 방식으로 UI 자체를 일반화하려 했습니다. 하지만:

- **Context를 통한 데이터 전달은 시점 이동 비용을 증가**시킵니다. `EditFooter`가 `useEditContext()`로 데이터를 꺼내면, 어디서 그 값이 주입되는지 Provider까지 따라가야 합니다.
- **각 페이지의 UI가 실제로 다릅니다.** 인권신고는 신고자/피침해자/침해자 폼이 있고, 자료집은 카테고리 드롭다운이 있고, 건의(qna)는 질문 대상 선택이 있습니다. compound component로 억지로 맞추면 `SubSlot`, `SideSlot` 같은 기획서에 없는 개념이 필요해집니다.
- **Props가 "how"를 노출합니다.** `EditPage`의 props가 `register`, `isImageProcessing`, `processImages` 같은 구현 세부사항으로 가득 차면, 이 컴포넌트를 보고 "이 페이지가 뭐하는 페이지인지" 알 수 없습니다.

따라서 **UI 일반화 대신, 공통 UI 조각만 추출하고 로직은 각 페이지에 유지**하는 방향을 선택했습니다.

#### `submitPost` 유틸리티 (검토 후 기각)

제출 시 create/patch 분기 + queryClient 무효화 + navigate 패턴이 3개 페이지에서 ~20줄씩 반복되어 `submitPost({ postId, data, createPost, patchPost, queryClient, navigate, boardKey, basePath })` 유틸리티를 검토했습니다. 하지만 **onSuccess 안에서 어떤 쿼리를 무효화하고 어디로 이동하는지가 인라인으로 바로 보이는 것이 더 읽기 좋다**는 판단으로 기각했습니다.

#### 제목 입력 컴포넌트 (검토 후 기각)

제목 `<Input>` + 에러 표시 `<p>` 패턴이 3개 페이지에서 반복되어 `EditTitleInput` 컴포넌트를 검토했습니다. 하지만 페이지별로 Input의 className이 다르고(data는 커스텀 스타일), 8줄짜리 JSX에 className prop을 추가하면 오히려 복잡해지므로 기각했습니다.

---

## 생성된 파일 (6개)

### `src/components/EditPageSkeleton.tsx`

4개 페이지에서 동일하게 반복되던 로딩 스켈레톤을 독립 컴포넌트로 추출했습니다.

```tsx
// Before: 각 페이지에 인라인으로 존재
function PageSkeleton() {
  return (
    <article className="mb-20 mt-16">
      <PostHeader.Skeleton />
      <hr className="bg-[#E7E7E7]" />
      <Container.Skeleton />
      <PostFooter.Skeleton />
    </article>
  );
}

// After: import 한 줄로 대체
import { EditPageSkeleton } from '@/components/EditPageSkeleton';
// ...
if (isLoading) return <EditPageSkeleton />;
```

### `src/components/EditPageError.tsx`

4개 페이지에서 동일하게 반복되던 에러 표시를 독립 컴포넌트로 추출했습니다. `message` prop으로 커스텀 메시지를 전달할 수 있습니다.

```tsx
// Before: 각 페이지에 인라인으로 존재
return (
  <div className="mt-16 flex items-center justify-center py-12">
    <p>오류가 발생하였습니다. 관리자에게 문의하십시오.</p>
  </div>
);

// After
import { EditPageError } from '@/components/EditPageError';
// ...
if (isError) return <EditPageError />;
// 커스텀 메시지가 필요한 경우 (qna-notice 로그인 체크):
if (!isLogin) return <EditPageError message="로그인 후 이용해 주세요." />;
```

### `src/components/EditFooter.tsx`

4개 페이지에서 10~15줄씩 반복되던 등록 버튼 영역을 독립 컴포넌트로 추출했습니다.

**핵심 설계: Context 없이 props만 사용합니다.** 모든 동작이 호출부에서 명시적으로 보입니다.

```tsx
interface EditFooterProps {
  onSubmit: () => void;      // handleSubmit(submitForm)을 전달
  disabled?: boolean;         // 비활성화 조건을 호출부에서 직접 조합
  isLoading?: boolean;        // 스피너 표시 여부
  className?: string;
  children?: ReactNode;       // 버튼 텍스트 (기본값: "등록")
}
```

```tsx
// Before: 각 페이지에 직접 조립
<ArticleFooter className="pb-6">
  <Button
    variant="register"
    className="flex items-center justify-center gap-1 self-end px-2"
    disabled={Object.keys(errors).length > 0 || isImageProcessing || isFileUploadPending}
    onClick={handleSubmit(submitForm)}
  >
    <Loader2
      className={cn('animate-spin transition-all', isImageProcessing ? 'ml-0 opacity-100' : '-ml-7 opacity-0')}
    />
    <p>등록</p>
  </Button>
</ArticleFooter>

// After: 조건이 호출부에서 그대로 보임
<EditFooter
  onSubmit={handleSubmit(submitForm)}
  disabled={Object.keys(errors).length > 0 || isImageProcessing || isFileUploadPending}
  isLoading={isImageProcessing || isFileUploadPending}
/>
```

**페이지별로 다른 조건도 호출부에서 바로 확인 가능합니다:**

```tsx
// human-rights: 개인정보 동의 조건 추가
<EditFooter
  disabled={!disclaimerAgreed || Object.keys(errors).length > 0 || isImageProcessing || isFileUploadPending}
  ...
/>

// qna-notice: 버튼 텍스트 동적 변경
<EditFooter ... >
  {postId ? '수정' : '등록'}
</EditFooter>

// data: watch를 사용한 세밀한 비활성화 조건
<EditFooter
  disabled={
    !watch('title')?.trim() ||
    !watch('content')?.trim() ||
    !category ||
    files.length === 0 ||
    ...
  }
  ...
/>
```

### `src/hooks/editor/useEditableContent.ts`

3개 페이지(sug-notice, human-rights, data)에서 동일하게 반복되던 에디터 관련 코드를 훅으로 추출했습니다.

**묶은 것**: `editorRef` + `useContentEditor` + `isPostLoaded` + `handleContentChange` + `handleContentBlur` + `loadContent` + `markLoaded`

**묶지 않은 것**: 뮤테이션, 파일 첨부, 네비게이션, 제출 로직 — 에디터와 무관한 관심사

이전에 기각된 `usePostEditor`와 다른 점: 에디터 관심사만 묶음. 모든 항목이 `editorRef`에 의존하는 자연스러운 응집. `setValue`/`trigger`를 명시적으로 받아서 폼 연결이 밖에서 보임.

```tsx
// Before: 매 페이지에서 ~20줄 반복
const editorRef = useRef<Editor>(null);
const { register: registerEditor, processImages, isImageProcessing } = useContentEditor(BOARD_CODE, editorRef);
const [isPostLoaded, setIsPostLoaded] = useState(false);

function handleContentChange() {
  if (editorRef.current && isPostLoaded) {
    setValue('content', editorRef.current.getInstance().getMarkdown());
  }
}
function handleContentBlur() {
  (async () => await trigger('content'))();
}

// useEffect 안에서:
editorRef.current!.getInstance().setMarkdown(post.content);
setIsPostLoaded(true);

// After: 3줄로 대체
const editor = useEditableContent({ boardCode: BOARD_CODE, setValue, trigger });
const { ref: editorRef, isPostLoaded, loadContent, markLoaded } = editor;

// useEffect 안에서:
loadContent(post.content);
markLoaded();

// 렌더에서:
<Editor {...editor.editorProps} />
```

### `src/hooks/editor/useFileAttachments.ts`

3개 페이지에서 동일하게 반복되던 파일 첨부 상태 관리를 훅으로 추출했습니다.

```tsx
// Before: 매 페이지에서 반복
const [files, setFiles] = useState<PostFile[]>([]);
function handleFilesChange(newFiles: PostFile[]) { setFiles(newFiles); }
// useEffect 안에서 파일 변환 로직 6~10줄

// After
const attachments = useFileAttachments();
const { loadFiles } = attachments;

// useEffect 안에서:
loadFiles(post.fileResponseList);
// 카테고리가 필요한 경우 (자료집):
loadFiles(post.fileResponseList, { filter: () => true, withCategory: true });

// 렌더에서:
<FileInputs files={attachments.files} onChange={attachments.handleChange} />
```

### `src/hooks/editor/collectPostFiles.ts`

sug-notice와 human-rights에서 동일하게 반복되던 제출 시 파일/이미지 수집 로직을 순수 함수로 추출했습니다.

```tsx
// Before: 매 페이지에서 ~10줄 반복
const postFileList = files.filter(f => f.isUploaded).map(({ id }) => id);
const localFiles = files.filter(f => !f.isUploaded).map(({ file }) => file);
const uploaded = await uploadFiles({ files: localFiles });
uploaded.postFiles.forEach(({ id }) => postFileList.push(id));
const uploadedImages = post?.fileResponseList?.filter(...) ?? [];
const { existedImages, newImages, content } = await processImages(uploadedImages);
existedImages.forEach(({ postFileId }) => postFileList.push(postFileId));
newImages.forEach(({ id }) => postFileList.push(id));

// After: 함수 호출 한 번으로 대체
const { postFileList, content } = await collectPostFiles({
  files: attachments.files,
  uploadFiles,
  processImages: editor.processImages,
  existingImages,
});
```

**참고**: 자료집(data)은 파일별 카테고리 업로드 방식이 달라 `collectPostFiles`를 사용하지 않고 기존 로직을 유지합니다.

---

## 수정된 파일 (4개)

모든 수정 페이지에 동일한 패턴을 적용했습니다. 로직 변경은 없습니다.

### 공통 변경사항

| 변경 | Before | After |
|------|--------|-------|
| 로딩 스켈레톤 | 인라인 `PageSkeleton` 함수 | `<EditPageSkeleton />` |
| 에러 표시 | 인라인 `<div>` 블록 | `<EditPageError />` |
| 헤더 | `<ArticleHeader><h1>...</h1></ArticleHeader>` | `<EditHeader><EditHeader.Title>...</EditHeader.Title></EditHeader>` |
| 등록 버튼 | `<ArticleFooter>` + `<Button>` + `<Loader2>` | `<EditFooter onSubmit={...} disabled={...} isLoading={...} />` |
| 에디터 셋업 | `useRef` + `useContentEditor` + `isPostLoaded` + 핸들러 함수들 (~20줄) | `useEditableContent({ boardCode, setValue, trigger })` |
| 파일 상태 | `useState<PostFile[]>` + `handleFilesChange` + 파일 로드 로직 | `useFileAttachments()` |
| 파일/이미지 수집 | 제출 함수 내 ~10줄 반복 | `collectPostFiles(...)` |
| import 정리 | `PostHeader`, `PostFooter`, `ArticleHeader`, `ArticleFooter`, `Button`, `Loader2` 직접 import | 공유 컴포넌트/훅 import로 대체 |
| 섹션 주석 | 없음 또는 비일관적 | `/* ── 라우트 ── */`, `/* ── 폼 ── */` 등 일관된 구조 |

### 페이지별 적용 상세

#### `src/pages/sug-notice/edit/page.tsx`

가장 단순한 페이지. 레퍼런스 구현으로 가장 먼저 리팩토링했습니다.

**에디터**: `useRef` + `useContentEditor` + `isPostLoaded` + `handleContentChange` + `handleContentBlur` → `useEditableContent` 한 줄로 대체. 렌더에서 `<Editor onChange={handleContentChange} onBlur={handleContentBlur} {...registerEditor} />` → `<Editor {...editor.editorProps} />`

**파일**: `useState<PostFile[]>` + `handleFilesChange` → `useFileAttachments()`. useEffect 내 파일 변환 로직 6줄 → `loadFiles(post.fileResponseList)` 한 줄.

**제출**: 파일 업로드 + 이미지 처리 + ID 합치기 ~15줄 → `collectPostFiles(...)` 호출 한 번으로 대체.

**기존 데이터 로드 useEffect** 변경:
```tsx
// Before
if (post && editorRef.current && !isPostLoaded) {
  setIsPostLoaded(false);
  reset(post);
  editorRef.current!.getInstance().setMarkdown(post.content);
  const uploadedFiles = post.fileResponseList
    .filter(({ fileType }) => fileType === 'files')
    .map(({ postFileId, fileName }): UploadedPostFile => ({ ... }));
  setFiles(uploadedFiles);
  setIsPostLoaded(true);
}

// After
if (post && editorRef.current && !isPostLoaded) {
  reset(post);
  loadContent(post.content);
  loadFiles(post.fileResponseList);
  markLoaded();
}
```

#### `src/pages/data/edit/page.tsx`

**에디터**: sug-notice와 동일하게 `useEditableContent` 적용. 기존에 `isImageProcessing`만 사용하고 `processImages`는 미사용 — `useEditableContent`가 둘 다 제공하므로 문제 없음.

**파일**: `useFileAttachments()` 적용. 자료집은 모든 파일에 카테고리가 있어서 `loadFiles` 호출 시 옵션 사용:
```tsx
loadFiles(post.fileResponseList, { filter: () => true, withCategory: true });
```

**제출**: `collectPostFiles` 미사용. 자료집은 파일마다 개별 카테고리로 업로드하는 고유 로직이 있어서 기존 제출 로직을 유지합니다:
```tsx
// 파일별로 카테고리를 붙여 개별 업로드 — 다른 페이지와 패턴이 다름
const uploadedFiles = await Promise.all(
  localFiles.map(async (file) => {
    const { postFiles } = await uploadFiles({
      fileType: file.category!.replace(/·/g, ''),
      files: [file.file],
    });
    return postFiles.map(({ id }) => id);
  })
);
```

**기타**: `watch()`를 사용한 세밀한 `disabled` 조건은 `EditFooter`의 `disabled` prop에 `attachments.files`로 참조하도록 변경.

#### `src/pages/human-rights/edit/page.tsx`

가장 복잡한 페이지. 신고자/피침해자/침해자 폼, 개인정보 동의 등 고유 UI는 전부 유지했습니다.

**에디터/파일**: sug-notice와 동일하게 `useEditableContent` + `useFileAttachments` 적용. 이 페이지는 `postFileList` 필드명이 다름 (`fileResponseList`가 아닌 `postFileList`) — `loadFiles`가 동일한 `FileResponse[]` 타입을 받으므로 문제 없음.

**제출**: `collectPostFiles` 적용. sug-notice와 동일한 패턴.

**userInfo 로드 useEffect**: `isPostLoaded` 의존이 `editor.isPostLoaded`에서 destructure한 `isPostLoaded`로 변경. 동작은 동일.

**EditFooter**: `disabled`에 `!disclaimerAgreed` 조건이 추가된 것이 유일한 차이점.

#### `src/pages/qna-notice/edit/page.tsx`

이 페이지는 새 훅(useEditableContent, useFileAttachments, collectPostFiles)을 **적용하지 않았습니다**. 이유:

- `useContentEditor` 자체를 사용하지 않음 — 커스텀 에디터 설정 (wysiwyg 전용, 이미지 업로드 없음, 커스텀 `toolbarItems`)
- 파일 업로드 없음
- `handleEditorChange`가 단순히 `setValue('content', ...)` — `useEditableContent`의 `shouldValidate` 옵션이나 `onBlur` 핸들러가 필요 없음

적용된 것은 UI 컴포넌트만:
- `EditPageSkeleton`, `EditPageError`, `EditHeader`, `EditFooter`
- 로그인 체크 가드 → `<EditPageError message="로그인 후 이용해 주세요." />`
- 등록/수정 버튼 텍스트 동적 변경 → `<EditFooter>{postId ? '수정' : '등록'}</EditFooter>`

---

## 레시피: 수정 페이지 구조

모든 수정 페이지는 아래 섹션 순서를 따릅니다. 새 수정 페이지를 만들 때 이 구조를 복사하고 각 섹션을 채우면 됩니다.

```tsx
export default function XxxEditPage() {
  /* ── 라우트 ── */
  // useParams, useNavigate, useQueryClient

  /* ── 데이터 조회 ── */
  // useGetXxxPost (수정 모드일 때 기존 게시글 조회)

  /* ── 폼 ── */
  // useXxxForm (react-hook-form + zod)

  /* ── 에디터 ── */
  // useEditableContent({ boardCode, setValue, trigger })
  // 이미지 업로드 불필요 시 (qna처럼) editorRef만 직접 사용

  /* ── 파일 상태 ── */
  // useFileAttachments() (해당 시)

  /* ── 로컬 상태 ── */
  // 페이지 고유 상태 (카테고리, 개인정보 동의 등)

  /* ── 뮤테이션 ── */
  // useCreateXxx, usePatchXxx, useUploadXxxFiles

  /* ── 기존 데이터 로드 ── */
  // useEffect: loadContent + loadFiles + markLoaded

  /* ── 제출 ── */
  // collectPostFiles → schema.parse → create/patch → invalidate → navigate

  /* ── 가드 ── */
  if (isLoading) return <EditPageSkeleton />;
  if (isError) return <EditPageError />;

  /* ── 렌더 ── */
  return (
    <article>
      <EditHeader>
        <EditHeader.Title>게시판명</EditHeader.Title>
      </EditHeader>
      <hr className="bg-[#E7E7E7]" />
      <Container>
        {/* 페이지 고유 UI */}
        <Editor {...editor.editorProps} />
        <FileInputs files={attachments.files} onChange={attachments.handleChange} />
      </Container>
      <EditFooter
        onSubmit={handleSubmit(submitForm)}
        disabled={...}
        isLoading={...}
      />
    </article>
  );
}
```

---

## 수정하지 않은 파일

| 파일 | 이유 |
|------|------|
| `src/hooks/useContentEditor.ts` | `useEditableContent`가 내부에서 사용. 기존 인터페이스 변경 없음 |
| `src/components/EditHeader.tsx` | 이미 존재하고 그대로 사용 |
| `src/containers/new/Container.tsx` | 변경 불필요 |
| `src/containers/new/ArticleHeader.tsx` | EditHeader 내부에서 사용 중 |
| `src/containers/new/ArticleFooter.tsx` | EditFooter 내부에서 사용 중 |
| `src/components/edit/FileInputs.tsx` | 변경 불필요 |
| `src/pages/notice/edit/page.tsx` | 스코프 밖 (deprecated API 사용) |
| `src/pages/audit/edit/page.tsx` | 스코프 밖 (deprecated API, 추후 삭제 예정) |

---

## 새 수정/작성 페이지 만들기

"공지사항 게시판"의 수정 페이지를 새로 만든다고 가정하고 단계별로 설명합니다.

### 1단계: 파일 생성

```
src/pages/notice/
├── schema.ts          ← 이미 있다면 스킵
├── queries.ts         ← 이미 있다면 스킵
└── edit/
    ├── form.ts        ← 새로 만들 파일
    └── page.tsx       ← 새로 만들 파일
```

### 2단계: 스키마 정의 (`schema.ts`)

게시글의 타입과 유효성 검증 스키마를 정의합니다. 이미 존재한다면 작성/수정 폼에 필요한 타입만 추가합니다.

```ts
// schema.ts
import z from 'zod';

// 작성/수정 폼에서 사용할 스키마
export const NoticeEditFormSchema = z.object({
  title: z.string().min(1).max(50),
  content: z.string().min(1),
  category: z.string(),
  isNotice: z.boolean(),
  postFileList: z.array(z.number()),
});

export type NoticeEditForm = z.infer<typeof NoticeEditFormSchema>;

// 서버 요청용 스키마 (필요 시 폼과 분리)
export const NoticeEditRequestSchema = NoticeEditFormSchema;
export type NoticeEditRequest = z.output<typeof NoticeEditRequestSchema>;
```

### 3단계: 쿼리/뮤테이션 훅 (`queries.ts`)

기존 공용 훅(`useGetPost`, `useCreatePost`, `usePatchPost`, `useUploadFiles`)을 게시판 코드로 래핑합니다.

```ts
// queries.ts
import { useGetPost } from '@/hooks/new/query/useGetPost';
import { useCreatePost } from '@/hooks/new/mutations/useCreatePost';
import { usePatchPost } from '@/hooks/new/mutations/usePatchPost';
import { useUploadFiles } from '@/hooks/new/mutations/useUploadFiles';
import { NoticePost, NoticePostSchema } from './schema';

const BOARD_CODE = '공지사항게시판' as const;

export function useGetNoticePost({ postId, queryOptions }) {
  return useGetPost<NoticePost>({
    boardCode: BOARD_CODE,
    postId,
    schema: NoticePostSchema,
    queryOptions,
  });
}

export function useCreateNoticePost(options = {}) {
  return useCreatePost({ boardCode: BOARD_CODE, ...options });
}

export function usePatchNoticePost(options = {}) {
  return usePatchPost({ boardCode: BOARD_CODE, ...options });
}

export function useUploadNoticeFiles(options = {}) {
  return useUploadFiles({ boardCode: BOARD_CODE, ...options });
}
```

### 4단계: 폼 훅 (`edit/form.ts`)

react-hook-form + zod 연결. 모든 수정 페이지에서 동일한 패턴입니다.

```ts
// edit/form.ts
import { DefaultValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NoticeEditForm, NoticeEditFormSchema } from '../schema';

export function useNoticeForm(defaultValues?: DefaultValues<NoticeEditForm>) {
  return useForm<NoticeEditForm>({
    resolver: zodResolver(NoticeEditFormSchema),
    mode: 'onBlur',
    defaultValues,
  });
}
```

### 5단계: 페이지 컴포넌트 (`edit/page.tsx`)

레시피 구조를 따라 작성합니다. **sug-notice의 `page.tsx`를 복사해서 시작하는 것을 권장합니다.** 가장 단순한 구조이므로 뼈대로 적합합니다.

```tsx
// edit/page.tsx
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { Editor } from '@toast-ui/react-editor';
import { cn } from '@/libs/utils';

import { Input } from '@/components/ui/input';
import { FileInputs } from '@/components/edit/FileInputs';
import { Container } from '@/containers/new/Container';
import { EditHeader } from '@/components/EditHeader';
import { EditFooter } from '@/components/EditFooter';
import { EditPageSkeleton } from '@/components/EditPageSkeleton';
import { EditPageError } from '@/components/EditPageError';

import { useEditableContent } from '@/hooks/editor/useEditableContent';
import { useFileAttachments } from '@/hooks/editor/useFileAttachments';
import { collectPostFiles } from '@/hooks/editor/collectPostFiles';
import { useNoticeForm } from './form';
import { useGetNoticePost, useCreateNoticePost, usePatchNoticePost, useUploadNoticeFiles } from '../queries';
import { NoticeEditForm, NoticeEditRequestSchema, NoticeEditRequest } from '../schema';

const BOARD_CODE = '공지사항게시판';

export default function NoticeEditPage() {
  /* ── 라우트 ── */
  const { id } = useParams<{ id?: string }>();
  const postId = id ? parseInt(id ?? '') || null : null;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  /* ── 데이터 조회 ── */
  const {
    data: post,
    isLoading,
    error,
    isError,
  } = useGetNoticePost({
    postId: postId ?? 0,
    queryOptions: { enabled: postId !== null },
  });

  /* ── 폼 ── */
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useNoticeForm({
    category: '',
    isNotice: false,
    postFileList: [],
  });

  /* ── 에디터 ── */
  const editor = useEditableContent({ boardCode: BOARD_CODE, setValue, trigger });
  const { ref: editorRef, isPostLoaded, loadContent, markLoaded } = editor;

  /* ── 파일 상태 ── */
  const attachments = useFileAttachments();
  const { loadFiles } = attachments;

  /* ── 로컬 상태 ── */
  // 페이지 고유 상태가 있다면 여기에 추가

  /* ── 뮤테이션 ── */
  const { mutate: createPost, isPending: isCreatePending } = useCreateNoticePost();
  const { mutate: patchPost, isPending: isPatchPending } = usePatchNoticePost();
  const { mutateAsync: uploadFiles, isPending: isFileUploadPending } = useUploadNoticeFiles();

  /* ── 기존 데이터 로드 ── */
  useEffect(() => {
    if (post && editorRef.current && !isPostLoaded) {
      reset(post);  // 또는 postTransformer(post)로 변환
      loadContent(post.content);
      loadFiles(post.fileResponseList);
      markLoaded();
    }
    if (!postId) {
      markLoaded();
    }
  }, [post, postId, reset, editorRef, isPostLoaded, loadContent, loadFiles, markLoaded]);

  /* ── 제출 ── */
  async function submitForm(formData: NoticeEditForm) {
    const existingImages = post?.fileResponseList?.filter(({ fileType }) => fileType === 'images') ?? [];
    const { postFileList, content } = await collectPostFiles({
      files: attachments.files,
      uploadFiles,
      processImages: editor.processImages,
      existingImages,
    });

    formData.postFileList = postFileList;
    formData.content = content;
    const data: NoticeEditRequest = NoticeEditRequestSchema.parse(formData);

    if (postId) {
      patchPost(
        { id: postId, post: data },
        {
          onSuccess: (data) => {
            queryClient
              .invalidateQueries({ queryKey: ['searchPosts', BOARD_CODE] })
              .then(() => queryClient.invalidateQueries({ queryKey: ['getPost', BOARD_CODE, postId] }))
              .then(() => navigate(`/notice/${data}`));
          },
        }
      );
    } else {
      createPost(
        { post: data },
        {
          onSuccess: (data) => {
            queryClient
              .invalidateQueries({ queryKey: ['searchPosts', BOARD_CODE] })
              .then(() => navigate(`/notice/${data.post_id}`));
          },
        }
      );
    }
  }

  /* ── 가드 ── */
  if (isLoading || isCreatePending || isPatchPending) {
    return <EditPageSkeleton />;
  }

  if ((postId && !post) || isError) {
    if (isError) console.log(error);
    return <EditPageError />;
  }

  const titleError = errors?.title;

  /* ── 렌더 ── */
  return (
    <article className="mt-[200px]">
      <EditHeader>
        <EditHeader.Title>공지사항</EditHeader.Title>
        {/* 작성자 표시가 필요한 경우: */}
        {/* <EditHeader.Member>{memberName}</EditHeader.Member> */}
      </EditHeader>
      <hr className="bg-[#E7E7E7]" />
      <Container>
        {/* 이 안에 페이지 고유 UI를 자유롭게 작성 */}
        <section className="mb-16 flex flex-col gap-6">
          <div>
            <Input id="title" type="text" placeholder="제목을 입력하세요." {...register('title')} />
            <p
              className={cn(
                'mt-1 text-sm text-red-700 transition-all',
                titleError ? 'h-5 translate-y-0 opacity-100' : 'h-0 -translate-y-2 opacity-0'
              )}
            >
              {titleError && titleError.type === 'too_big'
                ? '제목은 50자 이내이여야 합니다.'
                : '이 값은 필수입니다.'}
            </p>
          </div>
          <Editor
            height="620px"
            initialValue=""
            placeholder="글을 작성해주세요"
            useCommandShortcut={true}
            {...editor.editorProps}
          />
        </section>
        <section>
          <FileInputs
            files={attachments.files}
            onChange={attachments.handleChange}
            sizeLimit={1024 * 1024 * 5}
          />
        </section>
      </Container>
      <EditFooter
        onSubmit={handleSubmit(submitForm)}
        disabled={Object.keys(errors).length > 0 || editor.isImageProcessing || isFileUploadPending}
        isLoading={editor.isImageProcessing || isFileUploadPending}
      />
    </article>
  );
}
```

### 6단계: 라우트 등록

프로젝트의 라우터 설정에 새 페이지를 등록합니다.

### 커스터마이징 참고

| 상황 | 방법 | 참고 페이지 |
|------|------|------------|
| 카테고리 드롭다운이 필요 | `/* ── 로컬 상태 ── */`에 `useState`로 카테고리 관리, 렌더에 `FilterDropDown` 추가 | `data/edit/page.tsx` |
| 동적 폼 필드가 필요 (추가/삭제) | `useFieldArray`를 폼 훅에서 반환, 렌더에서 `map`으로 렌더링 | `human-rights/edit/page.tsx` |
| 이미지 업로드가 필요 없는 에디터 | `useEditableContent` 대신 `editorRef`만 직접 사용, `processImages`/`collectPostFiles` 호출 제거 | `qna-notice/edit/page.tsx` |
| 파일 첨부가 필요 없음 | `useFileAttachments()`, `FileInputs` 생략, 제출에서 파일 관련 로직 제거 | `qna-notice/edit/page.tsx` |
| 파일별 카테고리가 필요 | `loadFiles(list, { filter: () => true, withCategory: true })`, 제출은 커스텀 로직 유지 | `data/edit/page.tsx` |
| 등록/수정 버튼 텍스트 동적 변경 | `<EditFooter>{postId ? '수정' : '등록'}</EditFooter>` | `qna-notice/edit/page.tsx` |
| 추가 비활성화 조건이 필요 | `EditFooter`의 `disabled`에 조건 추가 (예: `!disclaimerAgreed \|\| ...`) | `human-rights/edit/page.tsx` |
| 작성자 표시가 필요 | `<EditHeader.Member>{memberName}</EditHeader.Member>` 추가 | `data/edit/page.tsx` |

---

## 추상화 현황 정리

### 추출한 것

| 계층 | 파일 | 적용 페이지 |
|------|------|------------|
| UI | `EditHeader` (기존) | 4개 전체 |
| UI | `EditFooter` | 4개 전체 |
| UI | `EditPageSkeleton` | 4개 전체 |
| UI | `EditPageError` | 4개 전체 |
| 에디터 로직 | `useEditableContent` | sug-notice, human-rights, data |
| 파일 로직 | `useFileAttachments` | sug-notice, human-rights, data |
| 제출 로직 | `collectPostFiles` | sug-notice, human-rights |

### 의도적으로 남긴 것

| 패턴 | 이유 |
|------|------|
| create/patch 분기 + invalidate + navigate | onSuccess 안에서 뭘 하는지 인라인으로 바로 보이는 게 더 읽기 좋음 |
| 제목 입력 + 에러 표시 JSX | 페이지별 Input className이 다르고, 8줄짜리 JSX에 className prop 추가 시 오히려 복잡해짐 |
| 가드 패턴 (loading/error 분기) | 페이지마다 체크하는 에러 조합이 다름 (qna: `isLogin`, human-rights: `isUserInfoError` 등) |
| useEffect 로딩 세부 로직 | data: `setCategory`, human-rights: `postTransformer` 등 페이지별 고유 변환이 존재 |
| data 제출 시 파일 업로드 | 파일마다 개별 카테고리로 업로드하는 고유 로직 — `collectPostFiles`와 패턴이 다름 |
| qna-notice 에디터/파일 | `useContentEditor` 자체를 사용하지 않는 페이지 — 커스텀 에디터 설정, 파일 업로드 없음 |
