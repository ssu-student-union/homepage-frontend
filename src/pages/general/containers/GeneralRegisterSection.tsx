import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { useNavigate, useLocation } from 'react-router-dom'
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from '@/components/ui/select' // Select 컴포넌트의 경로를 적절히 수정하세요
import { faculties, departments } from './index'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const nameRegex = new RegExp(/^[ㄱ-ㅎ|가-힣]+$/)

interface LoginFormProps {
    subSection1: string
    buttonSection: string
}

const LoginSchema = z.object({
    name: z
        .string()
        .min(1, '이름을 입력해주세요')
        .max(10, '이름은 10자 이내여야 합니다.')
        .regex(nameRegex, '잘못된 입력입니다.'),
    password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
    id: z.string().length(8, '학번은 8자리여야 합니다.'),
})

type LoginType = z.infer<typeof LoginSchema>

export function GeneralRegisterSection({
    subSection1,
    buttonSection,
}: LoginFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitted, isSubmitting },
        watch,
        setValue,
    } = useForm<LoginType>({
        resolver: zodResolver(LoginSchema),
    })

    const navigate = useNavigate()
    const location = useLocation()

    const [userData, setUserData] = useState(null)
    const [inputUserData, setInputUserData] = useState(null)
    const [selectedFaculty, setSelectedFaculty] = useState<string>('')
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)

    const isScouncilPath = location.pathname === '/register/scouncil'
    const showSelects = !isScouncilPath
    const formValues = watch()

    useEffect(() => {
        const KakaoUserData = localStorage.getItem('transformedUserData')
        setUserData(KakaoUserData ? JSON.parse(KakaoUserData) : null)

        const storedFormValues = localStorage.getItem('formValues')
        setInputUserData(storedFormValues ? JSON.parse(storedFormValues) : null)
    }, [])

    useEffect(() => {
        localStorage.setItem('formValues', JSON.stringify(formValues))
    }, [formValues])

    useEffect(() => {
        setSelectedFaculty(formValues.dropdown || '')
        if (!formValues.dropdown) {
            setValue('departmentDropdown', '') // 상위 카테고리가 선택되지 않으면 하위 카테고리를 선택할 수 없음
        }
    }, [formValues.dropdown])

    useEffect(() => {
        const isFormValid = isScouncilPath
            ? formValues.id && formValues.password
            : formValues.name &&
              formValues.id &&
              formValues.dropdown &&
              formValues.departmentDropdown
        setIsButtonDisabled(!isFormValid)
    }, [formValues, isScouncilPath])

    const onSubmit = async (data) => {
        if (userData && userData.data && data.name === inputUserData?.name) {
            const resultData = {
                name: userData.data.name,
                studentId: formValues.id,
                accessToken: userData.data.accessToken,
                refreshToken: userData.data.refreshToken,
                id: userData.data.id,
            }

            localStorage.setItem('ResultData', JSON.stringify(resultData))

            alert('학생 정보가 확인되었습니다')
            navigate('/')
        } else {
            alert('입력하신 정보가 올바르지 않습니다.')
        }

        const postData = isScouncilPath
            ? {
                  studentId: data.id,
                  password: data.password,
              }
            : {
                  userId: data.name,
                  studentId: data.id,
              }

        console.log('postData', postData)
    }

    return (
        <div className='flex items-center justify-center min-h-screen'>
            <div className='w-full max-w-md p-4 flex flex-col items-center'>
                <div className='text-[rgb(0,0,0)] text-2xl not-italic font-bold leading-[normal] pb-4'>
                    {subSection1}
                </div>
                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    {isScouncilPath ? (
                        <>
                            <Input
                                type='text'
                                placeholder='아이디'
                                className='w-[420px]'
                                {...register('id', {
                                    required: '아이디는 필수 입력입니다.',
                                })}
                                aria-invalid={
                                    isSubmitted
                                        ? errors.id
                                            ? 'true'
                                            : 'false'
                                        : undefined
                                }
                            />
                            {errors.id && <small>{errors.id.message}</small>}
                            <Input
                                type='password'
                                placeholder='비밀번호'
                                className='mt-4'
                                {...register('password', {
                                    required: '비밀번호는 필수 입력입니다.',
                                })}
                                aria-invalid={
                                    isSubmitted
                                        ? errors.password
                                            ? 'true'
                                            : 'false'
                                        : undefined
                                }
                            />
                            {errors.password && (
                                <small>{errors.password.message}</small>
                            )}
                        </>
                    ) : (
                        <>
                            <Input
                                type='text'
                                placeholder='이름'
                                className='w-[420px]'
                                {...register('name', {
                                    required: '이름은 필수 입력입니다.',
                                })}
                                aria-invalid={
                                    isSubmitted
                                        ? errors.name
                                            ? 'true'
                                            : 'false'
                                        : undefined
                                }
                            />
                            {errors.name?.message && (
                                <small>{errors.name?.message}</small>
                            )}
                            <Input
                                type='text'
                                placeholder='학번'
                                className='mt-4'
                                {...register('id', {
                                    required: '학번은 필수 입력입니다.',
                                })}
                                aria-invalid={
                                    isSubmitted
                                        ? errors.id
                                            ? 'true'
                                            : 'false'
                                        : undefined
                                }
                            />
                            {errors.id?.message && (
                                <small>{errors.id?.message}</small>
                            )}
                        </>
                    )}

                    {showSelects && (
                        <>
                            <div className='mt-4'></div>
                            <Select
                                {...register('dropdown', {
                                    required: '옵션을 선택해 주세요.',
                                })}
                                onValueChange={(value) => {
                                    setValue('dropdown', value)
                                    setSelectedFaculty(value)
                                }}
                                value={formValues.dropdown || ''}>
                                <SelectTrigger
                                    className={`border-gray-500 font-medium px-[20px] py-[26px] w-full min-h-[46px] text-sm ${
                                        formValues.dropdown
                                            ? 'text-black font-semibold'
                                            : 'text-[#9CA3AF]'
                                    }`}>
                                    <SelectValue placeholder='단과대 선택' />
                                </SelectTrigger>
                                <SelectContent>
                                    {faculties.map((faculty) => (
                                        <SelectItem
                                            key={faculty}
                                            value={faculty}>
                                            {faculty}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <div className='mt-4'></div>
                            <Select
                                {...register('departmentDropdown', {
                                    required: '학과/부를 선택해 주세요.',
                                })}
                                onValueChange={(value) => {
                                    setValue('departmentDropdown', value)
                                }}
                                value={formValues.departmentDropdown || ''}
                                disabled={!selectedFaculty} // 상위 카테고리가 선택되지 않으면 비활성화
                            >
                                <SelectTrigger
                                    className={`border-gray-500 font-medium px-[20px] py-[26px] w-full min-h-[46px] text-sm`}>
                                    <SelectValue placeholder='학과/부 선택' />
                                </SelectTrigger>
                                <SelectContent>
                                    {(departments[selectedFaculty] || []).map(
                                        (department) => (
                                            <SelectItem
                                                key={department}
                                                value={department}>
                                                {department}
                                            </SelectItem>
                                        )
                                    )}
                                </SelectContent>
                            </Select>
                        </>
                    )}
                    <Button
                        type='submit'
                        onClick={onSubmit}
                        disabled={isSubmitting || isButtonDisabled}
                        variant='default'
                        size='default'
                        className={`w-[420px] mt-4 ${
                            isSubmitting || isButtonDisabled
                                ? 'bg-gray-400'
                                : ''
                        }`}>
                        {buttonSection}
                    </Button>
                </form>
            </div>
        </div>
    )
}
