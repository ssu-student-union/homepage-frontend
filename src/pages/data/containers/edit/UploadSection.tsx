import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { FilterDropDown } from '@/components/FilterDropDown/FilterDropDown';
import { userCategories, UserFileCategories } from './index';
import { Trash2, Plus, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation, useNavigate } from 'react-router-dom';
import { postBoardDataSubCategoryPosts } from '@/apis/postBoardDataSubCategoryPost';
import { delBoardFiles } from '@/apis/delBoardFiles';
import DataDelBtn from '../dataDelBtn';
import { delBoardPosts } from '@/apis/delBoardPosts';
import { patchBoardDataPosts } from '@/apis/patchBoardDataPosts';
import { postBoardDataFiles } from '@/apis/postBoardDataFiles';

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
  const [postCategory, setPostCategory] = useState<string>();

  const { control, handleSubmit, setValue, getValues, trigger } = useForm({
    mode: 'onChange',
    defaultValues: {
      uploadName: post?.uploadName || '', // Ensure post is defined before accessing properties
      category: post?.fileNames || '',
      fileInputs: post?.fileInputs || [{ fileName: post?.fileName || '', type: post?.fileType || '' }], // Handle file inputs
    },
  });
  useEffect(() => {
    if (post?.content) {
      setPostCategory(post?.content);
    }
  }, [post]);

  useEffect(() => {
    console.log('postCategory', postCategory); // 상태가 변경된 후에 출력
  }, [postCategory]);

  const navigate = useNavigate();

  // 전달된 post 데이터의 fileData의 개수를 index에 저장
  const fileDataList = post?.files || []; // files 속성을 사용

  const [categories, setCategories] = useState<string[]>([]);
  const [fileCategories, setFileCategories] = useState<string[]>([]);
  const [fileInputSelecType, setfileInputSelecType] = useState<string>('');
  const [selectType, setSelectType] = useState<string>();

  /*const [patchPosts, setPatchPosts] = useState<string>('');*/

  useEffect(() => {
    setPostCategory(post?.content);

    console.log('post', post);
  }, [post]);
  const [fileInputs, setFileInputs] = useState(() => [
    {
      id: 0,
      type: '',
      fileName: '',
      isNew: true,
    },
    ...fileDataList.map(
      (
        fileData: {
          fileType: string;
          fileName: string;
          postFileId: number;
        },
        idx: number
      ) => {
        const rawFileType = fileData.fileType || '';
        const fileType = rawFileType.includes(',')
          ? rawFileType.split(',')[idx] // fileType이 ','로 구분된 문자열일 경우 인덱스에 해당하는 값을 사용
          : rawFileType; // 단일 값인 경우 그대로 사용

        return {
          id: idx + 1, // id는 1부터 시작
          type: fileType, // 수정된 fileType 사용
          fileName: fileData.fileName || '', // 파일 이름이 없는 경우 빈 문자열로 처리
          postFileId: fileData.postFileId, // postFileId가 없는 경우 undefined로 처리
          isNew: false,
        };
      }
    ),
  ]);

  const [tempFiles, setTempFiles] = useState<FileItem[]>([]);

  useEffect(() => {
    console.log('fileInputs', fileInputs);
  }, [fileInputs]);

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
    /*
    const category = getValues('category');
    console.log('isFormValid category', category);
    */

    const fileInputsArray = getValues('fileInputs');

    return /*category && */ fileInputsArray;
  };

  useEffect(() => {
    if (userId) {
      const UserFileCategoriesList = UserFileCategories[userId] || [];
      setFileCategories(UserFileCategoriesList);
    }
  }, [userId]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddInput = () => {
    const selectedType = fileInputSelecType;
    setSelectType(selectedType);
    setfileInputSelecType('파일종류 선택');

    if (fileInputRef.current && selectedType) {
      fileInputRef.current.accept = selectedType; // Set file input to accept selected type
      fileInputRef.current.click(); // Trigger file selection dialog
    } else {
      alert('파일 종류를 먼저 선택하세요.');
    }
  };

  // 파일 입력이 클릭될 때 실행되는 함수, 특정 인덱스 기반으로 처리
  const handleChangeInput = (index: number) => {
    const fileInputsArray = getValues('fileInputs');

    // 선택된 파일 입력의 인덱스를 기반으로 해당 항목 가져오기
    const selectedInput = fileInputsArray[index];

    // type이 배열일 경우, 문자열로 변환하여 accept 속성에 적용
    const selectedType = Array.isArray(selectedInput?.type) ? selectedInput.type.join(',') : selectedInput?.type;
    setSelectType(selectedType);

    if (fileInputRef.current && selectedType) {
      fileInputRef.current.accept = selectedType; // 선택된 파일 타입 설정
      fileInputRef.current.click(); // 파일 선택 창 열기
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

      const fileInputsArray = getValues('fileInputs');

      const currentFileInput = fileInputsArray[fileInputsArray.length - 1];

      const fileType = selectType;
      const isNew = currentFileInput && 'isNew' in currentFileInput ? currentFileInput.isNew : false;

      if (isNew && !fileType) {
        alert('파일 종류를 선택하세요.');
        return;
      }

      const newFile: FileItem = {
        file: file,
        fileName: file.name,
        category: getValues('category'),
        fileType: fileType || '',
        fileData: file,
        postFileId: 0,
        fileUrl: undefined,
      };

      setTempFiles((prevFiles) => [...prevFiles, newFile]);

      if (post) {
        // Add new file information without updating the last input
        setFileInputs((prevInputs) => [
          ...prevInputs, // Keep all the previous inputs unchanged
          { id: prevInputs.length + 1, fileName: file.name, type: fileType || 'hi', isNew: false }, // Add new input with file information
        ]);
      } else {
        // Update fileInputs to include new file information
        setFileInputs((prevInputs) => [
          ...prevInputs.slice(0, -1), // Remove the last input that was pending
          { ...currentFileInput, fileName: file.name, type: fileType || 'hi', isNew: false }, // Update last input
          { id: prevInputs.length + 1, type: '', fileName: '', isNew: true }, // Add new input
        ]);
      }

      trigger();
    }
  };

  const onSubmit = async () => {
    const formValues = getValues();
    console.log('formValues', formValues);
    if (!formValues.uploadName) {
      alert('제목이 없습니다. 제목을 입력하세요.');
      return;
    }

    const existingFiles = JSON.parse(localStorage.getItem('fileData') ?? '[]');

    const newFileData = {
      uploadName: formValues.uploadName,
      uploadDate: new Date().toLocaleDateString('en-GB'),
      fileData: fileInputs.map((file) => file.fileData), // Assuming fileData is to be fetched from somewhere else as fileInputs doesn't have it
      fileName: fileInputs.map((file) => file.fileName),
      category: fileInputs.map((file) => file.fileType), // Mapping fileType to category
      fileType: fileInputs.map((file) => file.fileType),
      postFileId: fileInputs.map((file) => file.postFileId),
    };

    existingFiles.push(newFileData);
    localStorage.setItem('fileData', JSON.stringify(existingFiles));

    // const patchData = getValues('fileInputs');
    //setPatchPosts(patchData);
    try {
      console.log();
      const uploadName = newFileData.uploadName.length > 0 ? newFileData.uploadName : null;
      const userName = userId || 'Unknown';
      const fileCategory = getValues('category');
      // Check and update fileType array
      const fileType =
        tempFiles.length > 0
          ? tempFiles.map((file) => (file.fileType.length > 0 ? file.fileType : post?.fileType[0] || null))
          : post?.fileType[0] || null;
      const accessToken = localStorage.getItem('accessToken');

      if (accessToken) {
        // If post data exists, update the post using patch
        if (post) {
          // Extract postFileId values from the post.files array
          // Proceed with file upload and new post creation

          console.log('tempFiles', tempFiles);
          console.log('fileType', fileType);
          console.log('post', post);
          console.log('post?.fileType[0]', post?.fileType[0]);

          /*
          if (fileTypes) {
            setFileType(fileTypes);
          } else {
           setFileType(post?.fileType[0]);
          }
            */

          console.log('fileType', fileType);

          const patchFileResponse = await postBoardDataFiles(
            fileType,
            accessToken,
            tempFiles.map((file) => file.file),
            []
          );

          console.log('patchFileResponse', patchFileResponse);

          const patchFileDataArray = patchFileResponse.data?.data?.postFiles;

          let patchFileUrls = Array.isArray(patchFileDataArray) ? patchFileDataArray.map((item) => item.id) : [];

          if (patchFileDataArray.length === 0) {
            const patchFileUrlsFallback = fileDataList.map((item: { postFileId: any }) => item.postFileId);

            patchFileUrls = patchFileUrlsFallback;
          }

          console.log('fileCategory', fileCategory);
          const posts = {
            title: uploadName,
            content: fileCategory,
            categoryCode: userName,
            thumbnailImage: null,
            isNotice: true,
            postFileList: [patchFileUrls[0]],
          };

          console.log('patch posts', posts);

          const responsePatch = await patchBoardDataPosts({
            fileCategory: fileCategory,
            postId: post.postId,
            posts: posts,
          });

          if (responsePatch.code === '200') {
            alert('파일 업데이트가 완료되었습니다.');
            navigate('/data');
          } else if (responsePatch.status === 401) {
            alert('파일 업데이트가 완료되었습니다.');
            navigate('/data');
          } else {
            alert('오류가 발생했습니다. 다시 시도해주세요.');
          }
        } else {
          // Proceed with file upload and new post creation
          const fileResponse = await postBoardDataFiles(
            fileType,
            accessToken,
            tempFiles.map((file) => file.file),
            []
          );

          console.log('tempFiles', tempFiles);

          const fileDataArray = fileResponse.data?.data?.postFiles;
          const fileUrls = Array.isArray(fileDataArray) ? fileDataArray.map((item) => item.id) : [];

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

          const responsePost = await postBoardDataSubCategoryPosts(fileCategory, resBody, accessToken);

          if (responsePost.status === 200) {
            alert('파일 업로드가 완료되었습니다.');
            navigate('/data');
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

  const handleRemove = async (id: number) => {
    if (post) {
      const inputToDelete = fileInputs[0]; // 배열의 첫 번째 값을 가져옴

      // 삭제하려는 파일이 기존 파일인지 확인 (isNew가 false인 경우에만 postFileId가 있음)
      if (post) {
        // tempFiles에서 삭제하려는 파일의 postFileId를 기준으로 일치하는 파일을 찾음

        const fileToDelete = post.fileData.find(
          (file: { postFileId: any }) => file.postFileId === inputToDelete.postFileId
        );

        const updatedFileInputs = fileInputs.filter((input) => input.id !== id);
        const updatedTempFiles = tempFiles.filter((file) => file.postFileId !== fileToDelete.postFileId);

        setFileInputs(updatedFileInputs);
        setTempFiles(updatedTempFiles);
        trigger(); // 폼 검증 트리거

        try {
          const boardCode = '자료집게시판';

          const fileUrls = post?.fileUrl[0];

          const delFiles = {
            boardCode: boardCode,
            fileUrls: [fileUrls],
            postId: post?.postId,
          };

          const response = await delBoardPosts(delFiles.boardCode, delFiles.postId, delFiles.fileUrls);

          if (response.status === 200) {
            alert('파일이 삭제되었습니다');
            window.location.reload();
          } else {
            alert('파일이 삭제되었습니다');
            window.location.reload();
          }
        } catch (error) {
          console.error('Error deleting file:', error);
        }
      } else {
        // 새로운 파일이므로 서버 요청 없이 상태만 업데이트
        const updatedFileInputs = fileInputs.filter((input) => input.id !== id);
        setFileInputs(updatedFileInputs);
        trigger(); // 폼 검증 트리거
      }
    } else {
      // fileInputs에서 해당 id와 매칭되는 파일을 찾음
      const inputToDelete = fileInputs.find((input) => input.id - 1);
      if (!inputToDelete) {
        alert('삭제할 파일을 찾을 수 없습니다.');
        return;
      }

      {
        // 새로운 파일이므로 서버 요청 없이 상태만 업데이트
        const updatedFileInputs = fileInputs.filter((input) => input.id !== id);
        setFileInputs(updatedFileInputs);
        trigger(); // 폼 검증 트리거
      }
    }
  };

  const handleRemovePost = async (id: number) => {
    if (window.confirm('해당 파일을 삭제하시겠습니까?')) {
      // fileInputs에서 해당 id와 매칭되는 파일을 찾음
      const inputToDelete = fileInputs.find((input) => input.id === id);
      console.log('inputToDelete', inputToDelete);

      if (!inputToDelete) {
        alert('삭제할 파일을 찾을 수 없습니다.');
        return;
      }

      // 삭제하려는 파일이 기존 파일인지 확인 (isNew가 false인 경우에만 postFileId가 있음)
      if (post && inputToDelete && !inputToDelete.isNew) {
        const fileToDelete = post.fileData.find(
          (file: { postFileId: any }) => file.postFileId === inputToDelete.postFileId
        );

        console.log('fileToDelete', fileToDelete);
        if (!fileToDelete) {
          alert('삭제할 파일을 찾을 수 없습니다.');
          return;
        }

        const updatedFileInputs = fileInputs.filter((input) => input.id !== id);
        const updatedTempFiles = tempFiles.filter((file) => file.postFileId !== fileToDelete.postFileId);

        setFileInputs(updatedFileInputs);
        setTempFiles(updatedTempFiles);
        trigger();

        try {
          const boardCode = '자료집게시판';
          const fileUrls = fileToDelete.fileUrl;
          const delFiles = {
            boardCode: boardCode,
            fileUrls: [fileUrls],
          };

          const response = await delBoardFiles(delFiles);

          if (response.code === '200') {
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

  const handlePlusInput = () => {
    setFileInputs((prevInputs) => [...prevInputs, { id: prevInputs.length + 1, type: '', fileName: '', isNew: false }]);
  };

  useEffect(() => {
    if (postCategory != null) {
      // postCategory가 null 또는 undefined가 아니면 업데이트
      setValue('category', postCategory ?? '카테고리');
    }
  }, [postCategory, setValue]);

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
          defaultValue={postCategory || '카테고리'} // 초기값으로 postCategory 설정
          rules={{ required: '카테고리를 선택하세요.' }}
          render={({ field }) => (
            <FilterDropDown
              defaultValue="카테고리"
              optionValue={categories}
              onValueChange={(value) => {
                field.onChange(value); // 필드의 값을 업데이트
                setValue('category', value); // React Hook Form의 상태도 업데이트
                trigger('category'); // 특정 필드만 검증 트리거
              }}
              value={field.value ?? postCategory ?? '카테고리'} // Using nullish coalescing
              className="ml-[10px] py-0 pl-9 text-sm text-gray-500 xs:h-[33px] xs:w-[105px] sm:h-[43px] sm:w-[141px] md:h-[44px] md:w-[140px] lg:h-[44px] lg:w-[141px] xl:h-[44px]  xl:w-[141px] xxl:h-[44px] xxl:w-[354px]"
            />
          )}
        />
      </div>

      <div>
        {fileInputs.map((input, index) => (
          <div key={input.id || index}>
            <div className="flex items-center align-middle">
              {input.isNew ? (
                <></>
              ) : (
                <>
                  <div className="relative mb-4 flex items-center">
                    <FileText className="top-20% absolute left-3 text-gray-600" />
                    <Controller
                      name={`fileInputs.${input.id}.fileName`}
                      control={control}
                      defaultValue={input.fileName}
                      render={({ field }) => (
                        <Input
                          type="text"
                          onClick={() => {
                            /*
                            if (post) {
                              handlePatchAddInput(index);
                              handleRemovePatchInput(input.id, index);
                            } else {
                            }
                              */
                            handleChangeInput(index); // 첫 번째 함수 실행
                          }}
                          placeholder="파일이름"
                          className="xl: left-2 border-gray-300 pl-10 font-normal text-gray-600 xs:h-[31px] xs:w-[186px] sm:h-[28px] sm:w-[186px] md:h-[43px] md:w-[346px] lg:h-[62px] lg:w-[727px] lg:text-lg xl:h-[62px] xl:w-[727px] xl:text-lg xxl:h-[62px] xxl:w-[1061px]"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            trigger();
                          }}
                          value={input.fileName || ''}
                        />
                      )}
                    />
                  </div>
                  <Controller
                    name={`fileInputs.${input.id}.type`}
                    control={control}
                    defaultValue={input.fileType || ''}
                    render={({ field }) => (
                      <FilterDropDown
                        defaultValue="파일종류 선택"
                        optionValue={fileCategories}
                        onValueChange={(value) => {
                          setValue(`fileInputs.${index}.type`, value);
                          field.onChange(value);
                          trigger();
                        }}
                        value={input.type}
                        className="mb-4  ml-[16px] border-gray-500 pl-9 text-sm text-gray-500 xs:h-[31px] xs:w-[105px] sm:h-[43px] sm:w-[141px] sm:text-xs md:h-[43px] md:w-[167px] lg:h-[62px] lg:w-[224px] lg:text-lg xl:h-[62px] xl:w-[224px] xl:text-xl xxl:h-[62px] xxl:w-[354px]"
                      />
                    )}
                  />

                  <button type="button" onClick={() => handleRemovePost(input.id)} className="mb-4 ml-2 ">
                    <Trash2 />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
        <div className="flex">
          <div className="relative flex items-center">
            <FileText className="top-20% absolute left-3 text-gray-600" />
            <Input
              type="text"
              onClick={handleAddInput}
              placeholder="파일을 선택해주세요"
              className="left-2 border-gray-300 pl-10 text-sm font-normal text-gray-600 xs:h-[31px] xs:w-[186px] sm:h-[28px] sm:w-[186px] md:h-[43px] md:w-[346px] lg:h-[62px] lg:w-[727px] lg:text-lg xl:h-[62px] xl:w-[727px] xl:text-lg xxl:h-[62px] xxl:w-[1061px]"
              readOnly
            />
          </div>

          <FilterDropDown
            defaultValue="파일종류 선택"
            optionValue={fileCategories} // fileOptions가 정의되어 있는지 확인하세요.
            className="ml-[16px] border-gray-500 pl-9 text-sm text-gray-500 xs:h-[31px] xs:w-[105px] sm:h-[43px] sm:w-[141px] sm:text-xs md:h-[43px] md:w-[167px] lg:h-[62px] lg:w-[224px] lg:text-lg xl:h-[62px] xl:w-[224px] xl:text-xl xxl:h-[62px] xxl:w-[354px]"
            onValueChange={(value) => {
              setfileInputSelecType(value); // 상태 업데이트
              // 추가적인 상태 업데이트나 검증 트리거를 여기에 추가할 수 있습니다.
            }}
            value={fileInputSelecType} // 현재 선택된 값 반영
          />

          <button type="button" className="ml-2" onClick={handlePlusInput}>
            <Plus />
          </button>
        </div>
        <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />

        <div className="flex justify-end xs:flex-col sm:flex-col">
          {post && (
            <div className="hidden text-end xs:text-center sm:text-center md:block lg:block xl:block xxl:block ">
              <button className="mr-3" onClick={() => handleRemove(post)}>
                <DataDelBtn />
              </button>
            </div>
          )}

          <div className="text-end xs:text-center sm:text-center">
            <Button
              type="submit"
              disabled={!isFormValid()}
              className="mt-[60px] px-9 py-2 xs:h-[32px] xs:w-[186px] sm:h-[44px] sm:w-[315px] md:h-[46px] md:w-[128px] lg:h-[46px] lg:w-[123px] xl:h-[46px] xl:w-[123px] xxl:h-[46px] xxl:w-[123px]"
            >
              등록
            </Button>
          </div>

          {post && (
            <div className="hidden text-end xs:block xs:text-center sm:block sm:text-center  ">
              <button onClick={() => handleRemove(post)}>
                <DataDelBtn />
              </button>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
