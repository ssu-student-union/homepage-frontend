import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { FilterDropDown } from '@/components/FilterDropDown/FilterDropDown';
import { userCategories } from './index';
import { Trash2, Plus, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation, useNavigate } from 'react-router-dom';
import { postBoardBoardCodeFiles } from '@/apis/postBoardBoardCodeFiles';
import { postBoardDataSubCategoryPosts } from '@/apis/postBoardDataSubCategoryPost';
import { userNameMapping } from '../index';
import { any } from 'zod';
import { delBoardFiles } from '@/apis/delBoardFiles';
import { patchBoardPosts } from '@/apis/patchBoardPosts';

interface FileItem {
  fileUrl: any;
  postFileId: number;
  file: File;
  fileName: string;
  category: string;
  fileType: string;
  fileData: any; // 'fileData' 속성이 필요합니다.
}
export default function UploadSection({ userId }: { userId: string }) {
  const location = useLocation();
  const { state } = location;
  const { post } = state || {}; // 전달된 데이터를 받아옴

  const { control, handleSubmit, setValue, getValues, trigger } = useForm({
    mode: 'onChange',
    defaultValues: {
      uploadName: post?.uploadName || '', // Ensure post is defined before accessing properties
      category: post?.fileNames || '',
      fileInputs: post?.fileInputs || [{ fileName: post?.fileName || '', type: post?.fileType || '' }], // Handle file inputs
    },
  });

  // 전달된 post 데이터의 fileData의 개수를 index에 저장
  const fileDataList = post?.fileData || [];
  const idx = fileDataList.length;

  const [categories, setCategories] = useState<string[]>([]);
  // 첫 번째 파일 입력 필드는 고정된 값, 이후는 fileData를 사용하여 설정

  const [fileInputs, setFileInputs] = useState(() => [
    {
      id: 0,
      type: '',
      fileName: '',
      isNew: true,
    },
    ...fileDataList.map((fileData, idx) => ({
      id: idx + 1, // id is starting from 1
      type: fileData.fileType.split(',')[idx] || '', // Assign the correct fileType based on index
      fileName: fileData.fileName,
      fileType: fileData.fileType.split(',')[idx] || '', // Ensure fileType is assigned
      postFileId: fileData.postFileId,
      isNew: false,
    })),
  ]);

  console.log('File Data List:', fileDataList);
  console.log('Generated fileInputs:', fileInputs);

  const [tempFiles, setTempFiles] = useState<FileItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (post) {
      console.log(post);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      const userCategoriesList = userCategories[userId] || [];
      setCategories(userCategoriesList);
    }
  }, [userId]);

  useEffect(() => {
    trigger();
  }, [fileInputs, categories, trigger]);

  const isFormValid = () => {
    const category = getValues('category');
    const fileInputsArray = getValues('fileInputs');

    return category && fileInputsArray;
  };

  const fileOptions = [
    '.pdf',
    '.docx',
    '.xlsx',
    '.jpg',
    '.jpeg',
    '.png',
    '.gif',
    '.bmp',
    '.tiff',
    '.svg',
    '.txt',
    '.rtf',
    '.html',
    '.htm',
    '.xml',
    '.json',
    '.csv',
    '.tsv',
    '.zip',
    '.rar',
    '.7z',
    '.tar',
    '.gz',
    '.bz2',
    '.iso',
    '.exe',
    '.dll',
    '.bat',
    '.sh',
    '.ps1',
    '.apk',
    '.mp3',
    '.wav',
    '.flac',
    '.aac',
    '.ogg',
    '.m4a',
    '.mp4',
    '.avi',
    '.mkv',
    '.mov',
    '.wmv',
    '.flv',
    '.webm',
    '.pptx',
    '.ppt',
    '.psd',
    '.ai',
    '.indd',
    '.xd',
    '.fig',
    '.sketch',
    '.blend',
    '.3ds',
    '.obj',
    '.fbx',
    '.dwg',
    '.dxf',
    '.stl',
    '.sldprt',
    '.java',
    '.py',
    '.js',
    '.jsx',
    '.ts',
    '.tsx',
    '.c',
    '.cpp',
    '.cs',
    '.swift',
    '.rb',
    '.go',
    '.php',
    '.css',
    '.scss',
    '.less',
    '.sass',
    '.coffee',
    '.dart',
    '.kt',
    '.rs',
    '.r',
    '.pl',
    '.sh',
    '.lua',
    '.scala',
    '.sql',
    '.db',
    '.md',
    '.markdown',
    // 필요시 더 많은 확장자를 추가
  ];
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddInput = () => {
    const fileInputsArray = getValues('fileInputs');
    const lastInput = fileInputsArray[fileInputsArray.length - 1];
    const selectedType = lastInput?.type;

    if (fileInputRef.current && selectedType) {
      fileInputRef.current.accept = selectedType; // 선택된 확장자로 파일 탐색기 설정
      fileInputRef.current.click(); // 파일 탐색기 열기
    } else {
      alert('파일 종류를 먼저 선택하세요.');
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const uploadName = getValues('uploadName');
    if (!uploadName.trim()) {
      alert('제목을 먼저 입력해주세요.');
      return;
    }

    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const category = getValues('category');

      const fileInputsArray = getValues('fileInputs');
      const currentFileInput = fileInputsArray[fileInputsArray.length - 1];
      const fileType = currentFileInput?.type;
      const isNew = currentFileInput && 'isNew' in currentFileInput ? currentFileInput.isNew : false;

      if (isNew && !fileType) {
        alert('파일종류를 선택하세요.');
        return;
      }

      const newFile: FileItem = {
        file: file,
        fileName: file.name,
        category,
        fileType: fileType || '',
        fileData: any,
      };

      setTempFiles((prevFiles) => [...prevFiles, newFile]);

      setFileInputs((prevInputs) => [
        { id: prevInputs.length + 1, type: '', fileName: file.name, isNew: false },
        ...prevInputs,
      ]);

      trigger();
    }
  };

  const onSubmit = async () => {
    const formValues = getValues();
    if (!formValues.uploadName) {
      alert('제목이 없습니다. 제목을 입력하세요.');
      return;
    }

    const existingFiles = JSON.parse(localStorage.getItem('fileData') ?? '[]');
    const newFileData = {
      uploadName: formValues.uploadName,
      uploadDate: new Date().toLocaleDateString('en-GB'),
      fileData: tempFiles.map((file) => file.fileData),
      fileName: tempFiles.map((file) => file.fileName),
      category: tempFiles.map((file) => file.category),
      fileType: tempFiles.map((file) => file.fileType),
      postFileId: tempFiles.map((file) => file.postFileId),
    };

    existingFiles.push(newFileData);
    localStorage.setItem('fileData', JSON.stringify(existingFiles));

    console.log('newFileData', newFileData);
    try {
      const UserData = localStorage.getItem('kakaoData');
      const uploadName = newFileData.uploadName.length > 0 ? newFileData.uploadName : null;
      const fileName = newFileData.fileName.length > 0 ? newFileData.fileName : null;
      const userName = (userNameMapping as { [key: string]: string })[userId] || 'Unknown';
      const fileCategory = newFileData.category.length > 0 ? newFileData.category[0] : '중앙운영위원회'; // 'defaultCategory'를 기본값으로 설정
      const fileType = String(newFileData.fileType.length > 0 ? newFileData.fileType : null);
      const postFileId = newFileData.postFileId.length > 0 ? newFileData.postFileId : null;

      const accessToken = localStorage.getItem('accessToken');

      if (accessToken) {
        const boardCode = '자료집게시판';

        console.log(postFileId);
        // If post data exists, update the post using patch
        if (post) {
          // Extract postFileId values from the post.files array
          // Proceed with file upload and new post creation
          const patchFileResponse = await postBoardBoardCodeFiles(
            boardCode,
            accessToken,
            tempFiles.map((file) => file.file),
            []
          );

          console.log('Complete File Response:', patchFileResponse);

          const patchFileDataArray = patchFileResponse.data?.data?.postFiles;
          console.log('patchFileDataArray:', patchFileDataArray);

          let patchFileUrls = Array.isArray(patchFileDataArray) ? patchFileDataArray.map((item) => item.id) : [];
          console.log('patchFileUrls:', patchFileUrls);

          if (patchFileDataArray.length === 0) {
            const patchFileUrlsFallback = fileDataList.map((item) => item.postFileId);
            console.log('Default patchFileUrls:', patchFileUrlsFallback);

            // 여기에서 patchFileUrls[0] 값을 확인해보세요
            console.log('patchFileUrlsFallback[0]:', patchFileUrlsFallback[0]);

            // 여기서 리턴하는 대신 변수에 값을 저장
            patchFileUrls = patchFileUrlsFallback;
          }

          const posts = {
            title: uploadName,
            content: fileCategory,
            categoryCode: userName,
            thumbnailImage: null,
            postFileList: patchFileUrls[0], // Use the extracted postFileIds here
          };

          console.log('posts:', posts);

          const responsePatch = await patchBoardPosts({
            boardCode: boardCode,
            postId: post.postId, // Use the existing post ID
            posts: posts,
          });

          console.log('Patch Response:', responsePatch);

          if (responsePatch.code === '200') {
            alert('파일 업데이트가 완료되었습니다.');
            navigate('/homepage-frontend/data');
          } else {
            alert('오류가 발생했습니다. 다시 시도해주세요.');
          }
        } else {
          // Proceed with file upload and new post creation
          const fileResponse = await postBoardBoardCodeFiles(
            boardCode,
            accessToken,
            tempFiles.map((file) => file.file),
            []
          );

          console.log('Complete File Response:', fileResponse);

          const fileDataArray = fileResponse.data?.data?.postFiles;
          const fileUrls = Array.isArray(fileDataArray) ? fileDataArray.map((item) => item.id) : [];

          console.log('File URLs:', fileUrls);

          if (fileUrls.length === 0) {
            console.error('No URLs found in the response.');
            return;
          }

          const resBody = {
            title: uploadName,
            content: fileCategory,
            categoryCode: userName,
            thumbNailImage: null,
            isNotice: true,
            postFileList: fileUrls,
          };

          console.log('categoryCode:', userName);

          console.log('fileType:', fileType);

          const responsePost = await postBoardDataSubCategoryPosts(fileCategory, fileType, resBody, accessToken);

          console.log('Post Response:', responsePost);

          if (responsePost.status === 200) {
            alert('파일 업로드가 완료되었습니다.');
            navigate('/homepage-frontend/data');
          } else {
            alert('오류가 발생했습니다. 다시 시도해주세요.');
          }
        }
      } else {
        alert('AccessToken이 없습니다.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handleRemoveInput = async (id: number) => {
    if (window.confirm('해당 파일을 삭제하시겠습니까?')) {
      // fileInputs에서 해당 id와 매칭되는 파일을 찾음
      const inputToDelete = fileInputs.find((input) => input.id - 1);
      if (!inputToDelete) {
        alert('삭제할 파일을 찾을 수 없습니다.');
        return;
      }

      console.log('inputToDelete', inputToDelete);
      console.log('post', post);

      // 삭제하려는 파일이 기존 파일인지 확인 (isNew가 false인 경우에만 postFileId가 있음)
      if (post) {
        // tempFiles에서 삭제하려는 파일의 postFileId를 기준으로 일치하는 파일을 찾음
        const fileToDelete = post.fileData.find((file) => file.postFileId);

        if (!fileToDelete) {
          alert('삭제할 파일을 찾을 수 없습니다.');
          return;
        }

        const updatedFileInputs = fileInputs.filter((input) => input.id !== id);
        const updatedTempFiles = tempFiles.filter((file) => file.postFileId !== fileToDelete.postFileId);

        setFileInputs(updatedFileInputs);
        setTempFiles(updatedTempFiles);
        trigger(); // 폼 검증 트리거

        try {
          console.log('fileToDelete', fileToDelete);
          const boardCode = '자료집게시판';
          const fileUrls = fileToDelete.fileUrl;
          console.log(fileUrls);

          const response = await delBoardFiles(boardCode, fileUrls);

          if (response.status === 200) {
            alert('파일이 성공적으로 삭제되었습니다.');
          } else {
            alert('파일 삭제에 실패했습니다. 다시 시도해주세요.');
          }
        } catch (error) {
          console.error('Error deleting file:', error);
          alert('파일 삭제 중 오류가 발생했습니다.');
        }
      } else {
        // 새로운 파일이므로 서버 요청 없이 상태만 업데이트
        const updatedFileInputs = fileInputs.filter((input) => input.id !== id);
        setFileInputs(updatedFileInputs);
        trigger(); // 폼 검증 트리거
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <div className="mb-4 flex flex-row">
        <Controller
          name="uploadName"
          control={control}
          defaultValue=""
          rules={{ required: '제목을 입력하세요.' }}
          render={({ field }) => (
            <Input
              type="text"
              placeholder="제목을 입력하세요."
              className="border-[#CDCDCD] text-[13px] placeholder-[#BFBFBF] xs:h-[32px] xs:w-[186px] sm:h-[33px] sm:w-[197px] md:h-[44px] md:w-[457px] lg:h-[44px] lg:w-[862px] xl:h-[44px] xl:w-[862px] xxl:h-[44px] xxl:w-[1061px]"
              {...field}
              onChange={(e) => {
                field.onChange(e);
                trigger();
              }}
            />
          )}
        />
        <Controller
          name="category"
          control={control}
          defaultValue=""
          rules={{ required: '카테고리를 선택하세요.' }}
          render={({ field }) => (
            <FilterDropDown
              defaultValue="카테고리"
              optionValue={categories}
              onValueChange={(value) => {
                setValue('category', value);
                trigger();
              }}
              value={field.value}
              className="ml-[10px] py-0 pl-9 text-sm text-gray-500 xs:h-[33px] xs:w-[105px] sm:h-[43px] sm:w-[141px] md:h-[44px] md:w-[140px] lg:h-[44px] lg:w-[141px] xl:h-[44px]  xl:w-[141px] xxl:h-[44px] xxl:w-[354px]"
            />
          )}
        />
      </div>

      <div>
        {fileInputs.map((input) => (
          <div key={input.id} className="mb-4">
            <div className="flex items-center">
              {input.isNew ? (
                <>
                  <div className="relative flex items-center">
                    <FileText className="top-20% absolute left-3 text-gray-600" />
                    <Input
                      type="text"
                      placeholder="파일을 선택해주세요"
                      className="left-2 border-gray-300 pl-10 text-sm font-normal text-gray-600 xs:h-[31px] xs:w-[186px] sm:h-[28px] sm:w-[186px] md:h-[43px] md:w-[346px] lg:h-[62px] lg:w-[727px] lg:text-lg xl:h-[62px] xl:w-[727px]  xl:text-lg xxl:h-[62px] xxl:w-[1061px]"
                    />
                  </div>

                  <Controller
                    name={`fileInputs.${input.id}.type`} // 템플릿 리터럴 변경
                    control={control}
                    defaultValue={input.type}
                    render={({ field }) => (
                      <FilterDropDown
                        defaultValue="파일종류 선택"
                        optionValue={fileOptions}
                        onValueChange={(value) => {
                          setValue(`fileInputs.${input.id}.type`, value); // 동일한 경로로 수정
                          field.onChange(value);
                          trigger();
                        }}
                        value={field.value}
                        className="ml-[16px] border-gray-500 pl-9 text-sm text-gray-500 xs:h-[31px] xs:w-[105px] sm:h-[43px] sm:w-[141px] sm:text-xs md:h-[43px] md:w-[167px] lg:h-[62px] lg:w-[224px] lg:text-lg xl:h-[62px] xl:w-[224px] xl:text-xl xxl:h-[62px] xxl:w-[354px]"
                      />
                    )}
                  />

                  <button type="button" className="ml-2" onClick={handleAddInput}>
                    <Plus />
                  </button>
                </>
              ) : (
                <>
                  <div className="relative flex items-center">
                    <FileText className="top-20% absolute left-3 text-gray-600" />
                    <Controller
                      name={`fileInputs.${input.id}.fileName`} // 점 표기법으로 변경
                      control={control}
                      defaultValue={input.fileName}
                      render={({ field }) => (
                        <Input
                          type="text"
                          placeholder="파일이름"
                          className="xl: left-2 border-gray-300 pl-10 font-normal text-gray-600 xs:h-[31px] xs:w-[186px] sm:h-[28px] sm:w-[186px] md:h-[43px] md:w-[346px] lg:h-[62px] lg:w-[727px] lg:text-lg xl:h-[62px] xl:w-[727px] xl:text-lg xxl:h-[62px] xxl:w-[1061px]"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            trigger();
                          }}
                        />
                      )}
                    />
                  </div>

                  <Controller
                    name={`fileInputs.${input.id}.type`} // 점 표기법으로 변경
                    control={control}
                    defaultValue={input.fileType}
                    render={({ field }) => (
                      <FilterDropDown
                        defaultValue="파일종류 선택"
                        optionValue={fileOptions}
                        onValueChange={(value) => {
                          setValue(`fileInputs.${input.id}.type`, value); // 동일한 경로로 수정
                          field.onChange(value); // 필드 값도 변경
                          trigger(); // 폼 검증 트리거
                        }}
                        value={field.value} // 필드 값으로 설정
                        className="ml-[16px] border-gray-500 pl-9 text-sm text-gray-500 xs:h-[31px] xs:w-[105px] sm:h-[43px] sm:w-[141px] sm:text-xs md:h-[43px] md:w-[167px] lg:h-[62px] lg:w-[224px] lg:text-lg xl:h-[62px] xl:w-[224px] xl:text-xl xxl:h-[62px] xxl:w-[354px]"
                      />
                    )}
                  />

                  <button type="button" onClick={() => handleRemoveInput(input.id)} className="ml-2">
                    <Trash2 />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
        <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />

        <div className="text-end xs:text-center sm:text-center md:text-center">
          <Button
            type="submit"
            disabled={!isFormValid()}
            className="mt-[60px] px-9 py-2 xs:h-[32px] xs:w-[186px] sm:h-[44px] sm:w-[315px] md:h-[55px] md:w-[580px] lg:h-[46px] lg:w-[123px] xl:h-[46px] xl:w-[123px] xxl:h-[46px] xxl:w-[123px]"
          >
            등록
          </Button>
        </div>
      </div>
    </form>
  );
}
