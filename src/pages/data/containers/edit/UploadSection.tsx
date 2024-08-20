import { useState, useEffect, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { FilterDropDown } from '@/components/FilterDropDown/FilterDropDown';
import { userCategories, UserFileCategories } from './index';
import { Trash2, Plus, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function UploadSection({ userId }: { userId: string }) {
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid },
    trigger,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      uploadName: '',
      category: '',
      fileInputs: [{ fileName: '', type: '' }],
    },
  });

  const [categories, setCategories] = useState<string[]>([]);
  const [fileInputs, setFileInputs] = useState([{ id: 1, type: '', fileName: '', isNew: true }]);
  const [fileOptions, setFileOptions] = useState([]);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      const userCategoriesList = userCategories[userId] || [];
      setCategories(userCategoriesList);
      const options = UserFileCategories[userId] || [];
      setFileOptions(options);
    }
  }, [userId]);

  useEffect(() => {
    trigger();
  }, [fileInputs, categories, trigger]);

  const isFormValid = () => {
    const category = getValues('category');
    const fileInputsArray = getValues('fileInputs');
    const hasValidFileInputs = fileInputsArray.some(
      (input) => input.fileName.trim() !== '' && input.type.trim() !== ''
    );
    return category && hasValidFileInputs;
  };

  const handleAddInput = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
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
      const isNew = currentFileInput?.isNew;

      if (isNew && !fileType) {
        alert('파일종류를 선택하세요.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const existingFiles = JSON.parse(localStorage.getItem('fileData')) || [];
        const existingFileData = existingFiles.find((f) => f.uploadName === uploadName);

        if (existingFileData) {
          // 기존 파일에 추가
          existingFileData.fileData.push(reader.result);
          existingFileData.fileName.push(file.name);
          existingFileData.category.push(category);
          existingFileData.fileType.push(fileType || '');
          aptured;
        } else {
          const newFileData = {
            uploadName,
            uploadDate: new Date().toLocaleDateString(),
            fileData: [reader.result],
            fileName: [file.name],
            category: [category],
            fileType: [fileType || ''],
          };
          existingFiles.push(newFileData);
        }

        localStorage.setItem('fileData', JSON.stringify(existingFiles));

        setFileInputs((prevInputs) => [
          { id: prevInputs.length + 1, type: '', fileName: file.name, isNew: false },
          ...prevInputs,
        ]);

        trigger();
      };

      reader.readAsDataURL(file);
    }
  };

  const handleRemoveInput = (id) => {
    if (window.confirm('해당 파일을 삭제하시겠습니까?')) {
      setFileInputs((prevInputs) => prevInputs.filter((input) => input.id !== id));
      trigger();
    }
  };

  const onSubmit = () => {
    const formValues = getValues();
    if (!formValues.uploadName) {
      alert('제목이 없습니다. 제목을 입력하세요.');
      return;
    }
    navigate('/data');
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
              className="ml-[10px] py-0 pl-9 text-lg text-gray-500 xs:h-[33px] xs:w-[105px] sm:h-[43px] sm:w-[141px] md:h-[44px] md:w-[140px] lg:h-[44px] lg:w-[141px] xl:h-[44px] xl:w-[141px] xxl:h-[44px] xxl:w-[354px]"
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
                      placeholder="파일이름"
                      className="left-2 border-gray-300 pl-10 text-sm font-normal text-gray-600 xs:h-[31px] xs:w-[186px] sm:h-[28px] sm:w-[186px] md:h-[43px] md:w-[346px] lg:h-[62px] lg:w-[727px] xl:h-[62px] xl:w-[727px] xxl:h-[62px] xxl:w-[1061px]"
                    />
                  </div>

                  <FilterDropDown
                    defaultValue="파일종류 선택"
                    optionValue={fileOptions}
                    className="ml-[16px] border-gray-500 pl-9 text-gray-500 xs:h-[31px] xs:w-[186px] sm:h-[43px] sm:w-[141px] sm:text-xs md:h-[43px] md:w-[167px] lg:h-[62px] lg:w-[224px] xl:h-[62px] xl:w-[224px] xxl:h-[62px] xxl:w-[354px]"
                    value={''}
                    aria-disabled="true"
                    disabled
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
                      name={`fileInputs[${input.id}].fileName`}
                      control={control}
                      defaultValue={input.fileName}
                      render={({ field }) => (
                        <Input
                          type="text"
                          placeholder="파일이름"
                          className="left-2 border-gray-300 pl-10 text-sm font-normal text-gray-600 xs:h-[31px] xs:w-[186px] sm:h-[28px] sm:w-[186px] md:h-[43px] md:w-[346px] lg:h-[62px] lg:w-[727px] xl:h-[62px] xl:w-[727px] xxl:h-[62px] xxl:w-[1061px]"
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
                    name={`fileInputs[${input.id}].type`}
                    control={control}
                    defaultValue={input.type}
                    rules={{ required: '카테고리를 선택하세요.' }}
                    render={({ field }) => (
                      <FilterDropDown
                        defaultValue="파일종류 선택"
                        optionValue={fileOptions}
                        onValueChange={(value) => {
                          setValue(`fileInputs[${input.id}].type`, value);
                          trigger();
                        }}
                        value={field.value}
                        className="ml-[16px] border-gray-500 pl-9 text-gray-500 xs:h-[31px] xs:w-[186px] sm:h-[43px] sm:w-[141px] sm:text-xs md:h-[43px] md:w-[167px] lg:h-[62px] lg:w-[224px] xl:h-[62px] xl:w-[224px] xxl:h-[62px] xxl:w-[354px]"
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
