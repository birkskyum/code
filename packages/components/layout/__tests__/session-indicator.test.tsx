import React from 'react'
import { render, screen } from '@acter/lib/test-utils'
import userEvent from '@testing-library/user-event'
import { SessionIndicator } from '@acter/components/layout/session-indicator'
import { ExampleUser, ExampleActer } from '@acter/schema/fixtures'
import { useUser } from '@acter/lib/user/use-user'

jest.mock('@acter/lib/user/use-user')

const user = {
  ...ExampleUser,
  Acter: ExampleActer,
}

describe('SessionIndicator', () => {
  const mockUseUser = useUser as jest.Mock
  beforeEach(() => {
    mockUseUser.mockReset()
  })

  it('when the user is not logged in should show a sign in button', () => {
    mockUseUser.mockReturnValue({
      loading: false,
    })
    render(<SessionIndicator />)
    expect(screen.findByRole('button', { name: 'signin-button' })).toBeTruthy()

    expect(
      screen.queryByRole('progressbar', { name: 'session-loading-indicator' })
    ).toBeFalsy()
    expect(screen.queryByRole('button', { name: 'profile-button' })).toBeFalsy()
    expect(screen.queryByRole('menu', { name: 'session-menu' })).toBeFalsy()
  })

  describe('when user logged in', () => {
    beforeEach(() => {
      mockUseUser.mockReturnValue({
        user,
        loading: false,
      })
    })
    it('should show the profile button and menu', () => {
      render(<SessionIndicator />)
      expect(
        screen.findByRole('button', { name: 'profile-button' })
      ).toBeTruthy()

      expect(
        screen.queryByRole('progressbar', { name: 'session-loading-indicator' })
      ).toBeFalsy()
      expect(
        screen.queryByRole('button', { name: 'signin-button' })
      ).toBeFalsy()
      expect(screen.queryByRole('menu', { name: 'session-menu' })).toBeFalsy()
    })

    it('should show the session menu when the profile button is clicked', async () => {
      render(<SessionIndicator />)
      const profileButton = await screen.findByRole('button', {
        name: 'profile-button',
      })
      expect(profileButton).toBeTruthy()
      userEvent.click(profileButton)
      expect(screen.queryByRole('menu', { name: 'session-menu' })).toBeFalsy()

      expect(
        screen.queryByRole('progressbar', { name: 'session-loading-indicator' })
      ).toBeFalsy()
      expect(
        screen.queryByRole('button', { name: 'signin-button' })
      ).toBeFalsy()
    })
  })
})
