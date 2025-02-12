import React from 'react'
import { FormControl, FormField, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Control, FieldPath } from 'react-hook-form'
import { z } from 'zod'
import { authFormSchema } from '@/lib/utils'

const formSchema = authFormSchema('sign-up')

interface CustomInput {
  control: Control<z.infer<typeof formSchema>>,
  name: FieldPath<z.infer<typeof formSchema>>,
  label: string,
  placeholder: string,
  
}

const CustomInput: React.FC<CustomInput> = ({ control, name, label, placeholder  }) => {
  return (
    <FormField
      control={control}
      name={name} // Use the 'name' prop here
      render={({ field }) => (
        <div className='form-item'>
          <FormLabel className='form-label'>
            {label} {/* Use the 'label' prop here */}
          </FormLabel>
          <div className='flex w-full flex-col'>
            <FormControl>
              <input
                placeholder={placeholder} // Use the 'placeholder' prop here
                className='Input-class'
                type={name === 'password' ? 'password' : name === 'email' ? 'email' : 'text'}
               
                
                {...field}
              />
            </FormControl>
            <FormMessage className='form-message mt-2' />
          </div>
        </div>
      )}
    />
  )
}

export default CustomInput
