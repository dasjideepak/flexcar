import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from './Button';
import { SearchFormValues } from '../types/vehicle';

interface SearchFormProps {
  onSubmit: (values: SearchFormValues) => void;
  isLoading?: boolean;
}

const validationSchema = Yup.object({
  zipCode: Yup.string()
    .required('ZIP code is required')
    .matches(
      /^\d{5}(-\d{4})?$/,
      'Please enter a valid ZIP code (e.g., 12345 or 12345-6789)'
    ),
});

export const SearchForm: React.FC<SearchFormProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  const initialValues: SearchFormValues = {
    zipCode: '',
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Find Your Perfect Vehicle
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Field
                  name="zipCode"
                  type="text"
                  placeholder="Enter ZIP code (e.g., 10001)"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.zipCode && touched.zipCode
                      ? 'border-primary-500'
                      : 'border-gray-300'
                  }`}
                />
                <ErrorMessage
                  name="zipCode"
                  component="div"
                  className="text-primary-500 text-sm mt-1"
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isLoading}
                className="sm:w-auto w-full max-h-12 flex items-center justify-center"
              >
                {isLoading ? 'Searching...' : 'Search Vehicles'}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
