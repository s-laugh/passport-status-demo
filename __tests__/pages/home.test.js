import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from '../../pages/home'
import { useRouter } from 'next/router'

// mocks useRouter to be able to use component' router.asPath
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))
jest.mock('../../components/InputField', () => () => {
  return <mock-modal data-testid="test-modal" />
})
jest.mock('../../components/ActionButton', () => () => {
  return <mock-modal data-testid="button-modal" />
})
jest.mock('../../components/ErrorSummary', () => () => {
  return <mock-modal data-testid="errors-modal" />
})

describe('Home page', () => {
  beforeEach(() => {
    useRouter.mockImplementation(() => ({
      pathname: '/',
      asPath: '/',
    }))
  })

  it('should render the page', () => {
    render(<Home />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
  })
})
