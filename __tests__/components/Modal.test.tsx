import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import '@testing-library/jest-dom/extend-expect'
import Modal from '../../components/Modal'

expect.extend(toHaveNoViolations)

describe('Modal', () => {
  const { container } = render(
    <Modal open actionButtons={[{ text: 'button text' }]}>
      <p>content</p>
    </Modal>
  )

  it('renders', () => {
    const sut = screen.getByRole('dialog')
    const content = screen.getByText('content')
    const actionButton = screen.getByText('button text')
    expect(sut).toBeInTheDocument()
    expect(content).toBeInTheDocument()
    expect(actionButton).toBeInTheDocument()
  })

  it('is meets a11y', async () => {
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
