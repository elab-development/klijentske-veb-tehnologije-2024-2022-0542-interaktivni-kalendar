import React from 'react';
//import { describe, it, expect } from '@jest/globals';

import CalendarApp from '../Components/CalendarApp'; // Putanja do komponente
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom'; 

describe('CalendarApp Component', () => {
  it('should render the CalendarApp component', () => {
    render(<CalendarApp />);
    expect(screen.getByText('Calendar')).toBeInTheDocument(); 
  });
});

