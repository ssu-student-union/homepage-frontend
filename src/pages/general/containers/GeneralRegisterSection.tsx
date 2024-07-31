import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { faculties, departments } from './index'; // Adjust the path accordingly

const KakaoUserData = localStorage.getItem('transformedUserData');
let userData = KakaoUserData ? JSON.parse(KakaoUserData) : null;

export function GeneralRegisterSection({ subSection1, buttonSection }) {
  const { register, handleSubmit, formState: { errors, isSubmitted, isSubmitting }, watch, setValue } = useForm();
  const navigate = useNavigate();
  const location = useLocation();

  const InputUserData = localStorage.getItem('formValues') ? JSON.parse(localStorage.getItem('formValues')) : null;
  const isScouncilPath = location.pathname === '/register/scouncil';
  const showSelects = !isScouncilPath;
  const formValues = watch();
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [dropdownSelected, setDropdownSelected] = useState(false);
  const [departmentDropdownSelected, setDepartmentDropdownSelected] = useState(false);

  useEffect(() => {
    localStorage.setItem('formValues', JSON.stringify(formValues));
  }, [formValues]);

  useEffect(() => {
    console.log("formValues.dropdown:", formValues.dropdown);
    setSelectedFaculty(formValues.dropdown || ''); // Handle default case
  }, [formValues.dropdown]);

  const onSubmit = async (data) => {
    console.log("Form submitted:", data); // Debug log for form data

    if (userData && userData.data && userData.data.name === InputUserData?.name) {
      // Update userData with the submitted ID
      userData.data.studentId = data.id;

      const resultData = {
        ...userData,
        data: {
          ...userData.data,
          studentId: data.id
        }
      };

      // Store resultData in localStorage
      localStorage.setItem('ResultData', JSON.stringify(resultData));

      alert("학생 정보가 확인되었습니다");
      navigate('/');
    } else {
      alert("입력하신 정보가 올바르지 않습니다.");
    }

    const postData = isScouncilPath
      ? {
          studentId: data.id,
          password: data.password,
        }
      : {
          userId: data.name,
          studentId: data.id,
        };

    console.log('postData', postData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-4 flex flex-col items-center">
        <div className="text-[rgb(0,0,0)] text-2xl not-italic font-bold leading-[normal] pb-4">{subSection1}</div>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          {isScouncilPath ? (
            <>
              <Input
                type="text"
                placeholder="아이디"
                className="w-[420px]"
                {...register("id", {
                  required: "아이디는 필수 입력입니다.",
                })}
                aria-invalid={isSubmitted ? (errors.id ? "true" : "false") : undefined}
              />
              {errors.id && <small>{errors.id.message}</small>}
              <Input
                type="password"
                placeholder="비밀번호"
                className="mt-4"
                {...register("password", {
                  required: "비밀번호는 필수 입력입니다.",
                })}
                aria-invalid={isSubmitted ? (errors.password ? "true" : "false") : undefined}
              />
              {errors.password && <small>{errors.password.message}</small>}
            </>
          ) : (
            <>
              <Input
                type="text"
                placeholder="이름"
                className="w-[420px]"
                {...register("name", {
                  required: "이름은 필수 입력입니다.",
                })}
                aria-invalid={isSubmitted ? (errors.name ? "true" : "false") : undefined}
              />
              {errors.name && <small>{errors.name.message}</small>}
              <Input
                type="text"
                placeholder="학번"
                className="mt-4"
                {...register("id", {
                  required: "학번은 필수 입력입니다.",
                })}
                aria-invalid={isSubmitted ? (errors.id ? "true" : "false") : undefined}
              />
              {errors.id && <small>{errors.id.message}</small>}
            </>
          )}

          {showSelects && (
            <>
              <div className="mt-4"></div>
              <Select
                {...register("dropdown", { required: "옵션을 선택해 주세요." })}
                aria-invalid={isSubmitted ? (errors.dropdown ? "true" : "false") : undefined}
                onValueChange={(value) => {
                  setValue('dropdown', value);
                  setDropdownSelected(true);
                }}
              >
                <SelectTrigger className={dropdownSelected ? "text-black font-semibold" : "text-[#9CA3AF]"}>
                  <SelectValue placeholder="단과대 선택" />
                </SelectTrigger>
                <SelectContent>
                  {faculties.map(faculty => (
                    <SelectItem key={faculty} value={faculty}>{faculty}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="mt-4"></div>
              <Select 
                {...register("departmentDropdown", { required: "학과/부를 선택해 주세요." })}
                aria-invalid={isSubmitted ? (errors.departmentDropdown ? "true" : "false") : undefined}
                onValueChange={(value) => {
                  setValue('departmentDropdown', value);
                  setDepartmentDropdownSelected(true);
                }}
              >
                <SelectTrigger className={departmentDropdownSelected ? "text-black font-semibold" : "text-[#9CA3AF]"}>
                  <SelectValue placeholder="학과/부 선택" />
                </SelectTrigger>
                <SelectContent>
                  {(departments[selectedFaculty] || []).map(department => (
                    <SelectItem key={department} value={department}>{department}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </>
          )}
          <Button
            type="submit"
            disabled={isSubmitting}
            variant={"default"}
            size={"default"}
            className="w-[420px] mt-4"
          >
            {buttonSection}
          </Button>
        </form>
      </div>
    </div>
  );
}
