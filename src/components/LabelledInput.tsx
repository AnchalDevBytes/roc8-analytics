import { labelledInputType } from '@/interfaces/UiInterface';

const LabelledInput = ({ label, id, type, placeholder, changeHandler } : labelledInputType ) => {
  return (
    <div className='flex flex-col gap-1 w-full'>
        <label htmlFor={label} className='text-slate-500'>
            {label}
        </label>
        <input
            id={id}
            name={id}
            type={type}
            placeholder={placeholder}
            onChange={changeHandler}
            className="border-2 w-full py-1 px-5 rounded-lg text-black"
        />
    </div>
  )
}

export default LabelledInput