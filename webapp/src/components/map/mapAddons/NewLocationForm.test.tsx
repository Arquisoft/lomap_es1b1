import { fireEvent, render, screen } from "@testing-library/react";
import NewUbicationForm from "./NewLocationForm";

describe('NewUbicationForm', () => {
  const defaultProps = {
    globalLat: 0,
    globalLng: 0,
    globalName: '',
    formOpened: true,
    globalAddress: '',
    globalCategory: 'M',
    globalDescription: '',
    nextID: { current: '1' },
    addMarker: jest.fn(),
    setGlobalLat: jest.fn(),
    setGlobalLng: jest.fn(),
    setGlobalName: jest.fn(),
    setFormOpened: jest.fn(),
    setGlobalDescription: jest.fn(),
    setGlobalCategory: jest.fn(),
    setAcceptedMarker: jest.fn(),
  };

  it('should render the form', () => {
    render(<NewUbicationForm {...defaultProps} />);
    expect(screen.getByText('NewLocationForm.latitude')).toBeInTheDocument();
    expect(screen.getByText('NewLocationForm.longitude')).toBeInTheDocument();
    expect(screen.getByText('NewLocationForm.name')).toBeInTheDocument();
    expect(screen.getByText('NewLocationForm.description')).toBeInTheDocument();
  });

  it('should submit the form when the "Aceptar" button is clicked', () => {
    render(<NewUbicationForm {...defaultProps} />);
    const submitButton = screen.getByText('NewLocationForm.accept');
    fireEvent.click(submitButton);
    expect(defaultProps.addMarker).toHaveBeenCalled();
  });

  it('should close the form when the "Cancelar" button is clicked', () => {
    render(<NewUbicationForm {...defaultProps} />);
    const cancelButton = screen.getByText('NewLocationForm.cancel');
    fireEvent.click(cancelButton);
    expect(defaultProps.setFormOpened).toHaveBeenCalledWith(false);
  });
});
