import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'

import { axe, toHaveNoViolations } from 'jest-axe'

import ApplicationNameBar from '../../src/components/ApplicationNameBar'

expect.extend(toHaveNoViolations)

jest.mock('next/link')

describe('ApplicationNameBar', () => {
  const sut = <ApplicationNameBar text="Test" href="/somelink" />

  it('renders', () => {
    render(sut)
    expect(screen.getByTestId('app-name-section')).toBeInTheDocument()
  })

  it('meets a11y', async () => {
    const { container } = render(sut)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
