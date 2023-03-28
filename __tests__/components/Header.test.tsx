import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'

import { axe, toHaveNoViolations } from 'jest-axe'

import Header from '../../src/components/Header'

const defaultRouterObj = {
  pathname: '/',
  asPath: '/',
  locale: 'en',
}

// mocks useRouter to be able to use component' router.asPath
jest.mock('next/router', () => ({
  useRouter: jest.fn(() => defaultRouterObj),
}))

jest.mock('../../src/components/ApplicationNameBar')
jest.mock('../../src/components/Banner')
jest.mock('next/link')

expect.extend(toHaveNoViolations)

describe('Header', () => {
  const sut = (
    <Header gocLink="testGocLink" skipToMainText="testSkipToMainText" />
  )

  it('renders Header', () => {
    render(sut)
    const headerNav = screen.getByRole('navigation')
    expect(headerNav).toBeInTheDocument()
  })

  it('has no a11y violations', async () => {
    const { container } = render(sut)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
