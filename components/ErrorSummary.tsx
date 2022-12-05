import { FormikErrors } from 'formik'
import { TFunction } from 'next-i18next'
import { FC } from 'react'

export interface ErrorSummaryItem {
  feildId: string
  errorMessage: string
}

export interface ErrorSummaryProps {
  id: string
  errors: ErrorSummaryItem[]
  summary: string
}

export const getErrorSummaryItem = (
  feildId: string,
  errorMessage: string
): ErrorSummaryItem => ({
  feildId,
  errorMessage,
})

export function GetErrorSummary<T>(formErrors: FormikErrors<T>, t: TFunction) {
  return Object.keys(formErrors)
    .filter((key) => !!formErrors[key as keyof typeof formErrors])
    .map((key) =>
      getErrorSummaryItem(
        key,
        t(formErrors[key as keyof typeof formErrors] as string)
      )
    )
}

const ErrorSummary: FC<ErrorSummaryProps> = ({ id, errors, summary }) => {
  return (
    <section id={id} className="border-l-6 border-accent-error mb-5 p-5">
      <h2 className="text-2xl font-bold mb-3">{summary}</h2>
      <ul className="list-disc space-y-2 pl-10">
        {errors.map(({ feildId, errorMessage }, index) => (
          <li key={index}>
            <a className="visited:text-link-default" href={`#${feildId}`}>
              {errorMessage}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ErrorSummary
