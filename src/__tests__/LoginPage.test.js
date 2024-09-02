import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LoginPage } from '../Components/CalendarApp';
import { useNavigate } from 'react-router-dom';

// Mockovanje useNavigate na vrhu fajla
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

test('should show an alert with incorrect login credentials', () => {
  global.alert = jest.fn(); 

  const { getByPlaceholderText, getByText } = render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );

  fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'wrong' } });
  fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'credentials' } });
  fireEvent.click(getByText('Log in'));

  expect(global.alert).toHaveBeenCalledWith('Inccorect email or password!');
});

test('should navigate to profile page on correct credentials', () => {
  // Clear mock history before each test
  mockNavigate.mockClear();

  const { getByPlaceholderText, getByText } = render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );

  fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'klijentske' } });
  fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'klijentske' } });
  fireEvent.click(getByText('Log in'));

  expect(mockNavigate).toHaveBeenCalledWith('/profil');
});
