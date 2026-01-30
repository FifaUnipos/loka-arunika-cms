import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import {
  ArrowLeft,
  ArrowRight,
  EyeIcon,
  EyeSlashIcon,
} from '@phosphor-icons/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const userSchema = z.object({
  // user data
  user_email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email format'),
  user_full_name: z
    .string()
    .min(1, 'Full name is required')
    .max(64, 'Full name must be at most 64 characters'),
  user_password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      'Password must contain uppercase, lowercase, and number',
    ),
  user_phone_number: z
    .string()
    .min(1, 'Phone number is required')
    .max(32, 'Phone number must be at most 32 characters')
    .regex(/^(0|62)[0-9]{8,30}$/, 'Invalid phone number format'),
});
const merchantSchema = z.object({
  // merchant data
  merchant_district_id: z.string().min(1, 'District is required'),
  merchant_province_id: z.string().min(1, 'Province is required'),
  merchant_regency_id: z.string().min(1, 'Regency is required'),
  merchant_village_id: z.string().min(1, 'Village is required'),
  merchant_address: z
    .string()
    .min(1, 'Address is required')
    .max(128, 'Address must be at most 128 characters'),
  merchant_address_send: z
    .string()
    .min(1, 'Shipping address is required')
    .max(128, 'Shipping address must be at most 128 characters'),
  merchant_email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email format'),
  merchant_name: z
    .string()
    .min(1, 'Merchant name is required')
    .max(128, 'Merchant name must be at most 128 characters'),
  merchant_phone_number: z
    .string()
    .min(1, 'Phone number is required')
    .max(32, 'Phone number must be at most 32 characters')
    .regex(/^(0|62)[0-9]{8,30}$/, 'Invalid phone number format'),
  merchant_zipcode: z
    .string()
    .min(1, 'Zipcode is required')
    .max(10, 'Zipcode must be at most 10 characters'),
});
const stepSchemas = [userSchema, merchantSchema] as const;

const stepFields = [
  ['user_email', 'user_full_name', 'user_password', 'user_phone_number'],
  [
    'merchant_district_id',
    'merchant_province_id',
    'merchant_regency_id',
    'merchant_village_id',
    'merchant_address',
    'merchant_address_send',
    'merchant_email',
    'merchant_name',
    'merchant_phone_number',
    'merchant_zipcode',
  ],
] as const;

export default function Index() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const form = useForm({
    defaultValues: {
      // User data
      user_email: '',
      user_full_name: '',
      user_password: '',
      user_phone_number: '',
      // Merchant data
      merchant_district_id: '',
      merchant_province_id: '',
      merchant_regency_id: '',
      merchant_village_id: '',
      merchant_address: '',
      merchant_address_send: '',
      merchant_email: '',
      merchant_name: '',
      merchant_phone_number: '',
      merchant_zipcode: '',
    },
    onSubmit: async ({ value }) => {
      console.log('Submit:', value);
      // API call here
    },
  });

  const totalSteps = 2;

  const validateCurrentStep = (): boolean => {
    const currentFields = stepFields[currentStep];
    const currentSchema = stepSchemas[currentStep];

    const stepValues = currentFields.reduce((acc, field) => {
      acc[field] = form.state.values[field];
      return acc;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }, {} as any);

    const result = currentSchema.safeParse(stepValues);

    if (!result.success) {
      result.error.errors.forEach((error) => {
        const fieldName = error.path[0] as
          | 'user_email'
          | 'user_full_name'
          | 'user_password'
          | 'user_phone_number'
          | 'merchant_district_id'
          | 'merchant_province_id'
          | 'merchant_regency_id'
          | 'merchant_village_id'
          | 'merchant_address'
          | 'merchant_address_send'
          | 'merchant_email'
          | 'merchant_name'
          | 'merchant_phone_number'
          | 'merchant_zipcode';
        form.setFieldMeta(fieldName, (prev) => ({
          ...prev,
          isTouched: true,
        }));
        form.setFieldValue(
          fieldName,
          form.state.values[fieldName as keyof typeof form.state.values],
        );
      });
      return false;
    }

    return true;
  };

  const validateAndNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < totalSteps - 1) {
        setCurrentStep((prev) => prev + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const handleNextOrSubmit = () => {
    if (currentStep < totalSteps - 1) {
      validateAndNext();
    } else {
      if (validateCurrentStep()) {
        form.handleSubmit();
      }
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleNextOrSubmit();
    }
  };

  return (
    <div className="min-h-svh flex justify-center items-center bg-gray-50">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-xl">
        {/* Progress Indicator */}
        <div className="flex gap-2 mb-8">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full transition-colors ${
                i <= currentStep ? 'bg-primary' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* Sliding Container */}
        <div className="overflow-hidden">
          <div className="h-max">
            <div
              className="h-max flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentStep * 100}%)`,
              }}
            >
              {/* Step 1 - User Data */}
              <div className="w-full shrink-0 px-1">
                <h2 className="text-xl font-semibold mb-6">User Information</h2>
                <div className="space-y-4">
                  <form.Field
                    name="user_email"
                    validators={{
                      onChange: ({ value }) => {
                        const result =
                          stepSchemas[0].shape.user_email.safeParse(value);
                        return result.success
                          ? undefined
                          : result.error.errors[0].message;
                      },
                      onBlur: ({ value }) => {
                        const result =
                          stepSchemas[0].shape.user_email.safeParse(value);
                        return result.success
                          ? undefined
                          : result.error.errors[0].message;
                      },
                    }}
                    children={(field) => (
                      <div className="space-y-2">
                        <Label htmlFor={field.name}>Email</Label>
                        <Input
                          id={field.name}
                          type="email"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          onKeyDown={handleInputKeyDown}
                          placeholder="user@example.com"
                        />
                        {field.state.meta.isTouched &&
                          field.state.meta.errors.length > 0 && (
                            <p className="text-xs text-red-600">
                              {field.state.meta.errors[0]}
                            </p>
                          )}
                      </div>
                    )}
                  />

                  <form.Field
                    name="user_full_name"
                    validators={{
                      onChange: ({ value }) => {
                        const result =
                          stepSchemas[0].shape.user_full_name.safeParse(value);
                        return result.success
                          ? undefined
                          : result.error.errors[0].message;
                      },
                      onBlur: ({ value }) => {
                        const result =
                          stepSchemas[0].shape.user_full_name.safeParse(value);
                        return result.success
                          ? undefined
                          : result.error.errors[0].message;
                      },
                    }}
                    children={(field) => (
                      <div className="space-y-2">
                        <Label htmlFor={field.name}>Full Name</Label>
                        <Input
                          id={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          onKeyDown={handleInputKeyDown}
                          placeholder="John Doe"
                        />
                        {field.state.meta.isTouched &&
                          field.state.meta.errors.length > 0 && (
                            <p className="text-xs text-red-600">
                              {field.state.meta.errors[0]}
                            </p>
                          )}
                      </div>
                    )}
                  />

                  <form.Field
                    name="user_password"
                    validators={{
                      onChange: ({ value }) => {
                        const result =
                          stepSchemas[0].shape.user_password.safeParse(value);
                        return result.success
                          ? undefined
                          : result.error.errors[0].message;
                      },
                      onBlur: ({ value }) => {
                        const result =
                          stepSchemas[0].shape.user_password.safeParse(value);
                        return result.success
                          ? undefined
                          : result.error.errors[0].message;
                      },
                    }}
                    children={(field) => (
                      <div className="space-y-2">
                        <Label htmlFor={field.name}>Password</Label>
                        <div className="relative">
                          <Input
                            id={field.name}
                            type={isVisible ? 'text' : 'password'}
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            onBlur={field.handleBlur}
                            onKeyDown={handleInputKeyDown}
                            placeholder={isVisible ? 'Hidden123' : '••••••••'}
                          />
                          {field.state.meta.isTouched &&
                            field.state.meta.errors.length > 0 && (
                              <p className="text-xs text-red-600">
                                {field.state.meta.errors[0]}
                              </p>
                            )}
                          <Button
                            variant="ghost"
                            onClick={toggleVisibility}
                            className="absolute right-3 top-0"
                            aria-label={
                              isVisible ? 'Hide password' : 'Show password'
                            }
                          >
                            {isVisible ? (
                              <EyeIcon size={20} />
                            ) : (
                              <EyeSlashIcon size={20} />
                            )}
                          </Button>
                        </div>
                      </div>
                    )}
                  />

                  <form.Field
                    name="user_phone_number"
                    validators={{
                      onChange: ({ value }) => {
                        const result =
                          stepSchemas[0].shape.user_phone_number.safeParse(
                            value,
                          );
                        return result.success
                          ? undefined
                          : result.error.errors[0].message;
                      },
                      onBlur: ({ value }) => {
                        const result =
                          stepSchemas[0].shape.user_phone_number.safeParse(
                            value,
                          );
                        return result.success
                          ? undefined
                          : result.error.errors[0].message;
                      },
                    }}
                    children={(field) => (
                      <div className="space-y-2">
                        <Label htmlFor={field.name}>Phone Number</Label>
                        <Input
                          id={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          onKeyDown={handleInputKeyDown}
                          placeholder="08123456789"
                        />
                        {field.state.meta.isTouched &&
                          field.state.meta.errors.length > 0 && (
                            <p className="text-xs text-red-600">
                              {field.state.meta.errors[0]}
                            </p>
                          )}
                      </div>
                    )}
                  />
                </div>
              </div>

              {/* Step 2 - Merchant Data */}
              <div className="w-full shrink-0 px-1">
                <h2 className="text-xl font-semibold mb-6">
                  Merchant Information
                </h2>
                <div className="space-y-4">
                  <form.Field
                    name="merchant_name"
                    validators={{
                      onChange: ({ value }) => {
                        const result =
                          stepSchemas[1].shape.merchant_name.safeParse(value);
                        return result.success
                          ? undefined
                          : result.error.errors[0].message;
                      },
                      onBlur: ({ value }) => {
                        const result =
                          stepSchemas[1].shape.merchant_name.safeParse(value);
                        return result.success
                          ? undefined
                          : result.error.errors[0].message;
                      },
                    }}
                    children={(field) => (
                      <div className="space-y-2">
                        <Label htmlFor={field.name}>Merchant Name</Label>
                        <Input
                          id={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          onKeyDown={handleInputKeyDown}
                          placeholder="My Store"
                        />
                        {field.state.meta.isTouched &&
                          field.state.meta.errors.length > 0 && (
                            <p className="text-xs text-red-600">
                              {field.state.meta.errors[0]}
                            </p>
                          )}
                      </div>
                    )}
                  />

                  <form.Field
                    name="merchant_email"
                    validators={{
                      onChange: ({ value }) => {
                        const result =
                          stepSchemas[1].shape.merchant_email.safeParse(value);
                        return result.success
                          ? undefined
                          : result.error.errors[0].message;
                      },
                      onBlur: ({ value }) => {
                        const result =
                          stepSchemas[1].shape.merchant_email.safeParse(value);
                        return result.success
                          ? undefined
                          : result.error.errors[0].message;
                      },
                    }}
                    children={(field) => (
                      <div className="space-y-2">
                        <Label htmlFor={field.name}>Merchant Email</Label>
                        <Input
                          id={field.name}
                          type="email"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          onKeyDown={handleInputKeyDown}
                          placeholder="store@example.com"
                        />
                        {field.state.meta.isTouched &&
                          field.state.meta.errors.length > 0 && (
                            <p className="text-xs text-red-600">
                              {field.state.meta.errors[0]}
                            </p>
                          )}
                      </div>
                    )}
                  />

                  <form.Field
                    name="merchant_phone_number"
                    validators={{
                      onChange: ({ value }) => {
                        const result =
                          stepSchemas[1].shape.merchant_phone_number.safeParse(
                            value,
                          );
                        return result.success
                          ? undefined
                          : result.error.errors[0].message;
                      },
                      onBlur: ({ value }) => {
                        const result =
                          stepSchemas[1].shape.merchant_phone_number.safeParse(
                            value,
                          );
                        return result.success
                          ? undefined
                          : result.error.errors[0].message;
                      },
                    }}
                    children={(field) => (
                      <div className="space-y-2">
                        <Label htmlFor={field.name}>
                          Merchant Phone Number
                        </Label>
                        <Input
                          id={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          onKeyDown={handleInputKeyDown}
                          placeholder="08123456789"
                        />
                        {field.state.meta.isTouched &&
                          field.state.meta.errors.length > 0 && (
                            <p className="text-xs text-red-600">
                              {field.state.meta.errors[0]}
                            </p>
                          )}
                      </div>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <form.Field
                      name="merchant_province_id"
                      validators={{
                        onChange: ({ value }) => {
                          const result =
                            stepSchemas[1].shape.merchant_province_id.safeParse(
                              value,
                            );
                          return result.success
                            ? undefined
                            : result.error.errors[0].message;
                        },
                        onBlur: ({ value }) => {
                          const result =
                            stepSchemas[1].shape.merchant_province_id.safeParse(
                              value,
                            );
                          return result.success
                            ? undefined
                            : result.error.errors[0].message;
                        },
                      }}
                      children={(field) => (
                        <div className="space-y-2">
                          <Label htmlFor={field.name}>Province</Label>
                          <Input
                            id={field.name}
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            onBlur={field.handleBlur}
                            onKeyDown={handleInputKeyDown}
                            placeholder="Province ID"
                          />
                          {field.state.meta.isTouched &&
                            field.state.meta.errors.length > 0 && (
                              <p className="text-xs text-red-600">
                                {field.state.meta.errors[0]}
                              </p>
                            )}
                        </div>
                      )}
                    />

                    <form.Field
                      name="merchant_regency_id"
                      validators={{
                        onChange: ({ value }) => {
                          const result =
                            stepSchemas[1].shape.merchant_regency_id.safeParse(
                              value,
                            );
                          return result.success
                            ? undefined
                            : result.error.errors[0].message;
                        },
                        onBlur: ({ value }) => {
                          const result =
                            stepSchemas[1].shape.merchant_regency_id.safeParse(
                              value,
                            );
                          return result.success
                            ? undefined
                            : result.error.errors[0].message;
                        },
                      }}
                      children={(field) => (
                        <div className="space-y-2">
                          <Label htmlFor={field.name}>Regency</Label>
                          <Input
                            id={field.name}
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            onBlur={field.handleBlur}
                            onKeyDown={handleInputKeyDown}
                            placeholder="Regency ID"
                          />
                          {field.state.meta.isTouched &&
                            field.state.meta.errors.length > 0 && (
                              <p className="text-xs text-red-600">
                                {field.state.meta.errors[0]}
                              </p>
                            )}
                        </div>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <form.Field
                      name="merchant_district_id"
                      validators={{
                        onChange: ({ value }) => {
                          const result =
                            stepSchemas[1].shape.merchant_district_id.safeParse(
                              value,
                            );
                          return result.success
                            ? undefined
                            : result.error.errors[0].message;
                        },
                        onBlur: ({ value }) => {
                          const result =
                            stepSchemas[1].shape.merchant_district_id.safeParse(
                              value,
                            );
                          return result.success
                            ? undefined
                            : result.error.errors[0].message;
                        },
                      }}
                      children={(field) => (
                        <div className="space-y-2">
                          <Label htmlFor={field.name}>District</Label>
                          <Input
                            id={field.name}
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            onBlur={field.handleBlur}
                            onKeyDown={handleInputKeyDown}
                            placeholder="District ID"
                          />
                          {field.state.meta.isTouched &&
                            field.state.meta.errors.length > 0 && (
                              <p className="text-xs text-red-600">
                                {field.state.meta.errors[0]}
                              </p>
                            )}
                        </div>
                      )}
                    />

                    <form.Field
                      name="merchant_village_id"
                      validators={{
                        onChange: ({ value }) => {
                          const result =
                            stepSchemas[1].shape.merchant_village_id.safeParse(
                              value,
                            );
                          return result.success
                            ? undefined
                            : result.error.errors[0].message;
                        },
                        onBlur: ({ value }) => {
                          const result =
                            stepSchemas[1].shape.merchant_village_id.safeParse(
                              value,
                            );
                          return result.success
                            ? undefined
                            : result.error.errors[0].message;
                        },
                      }}
                      children={(field) => (
                        <div className="space-y-2">
                          <Label htmlFor={field.name}>Village</Label>
                          <Input
                            id={field.name}
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            onBlur={field.handleBlur}
                            onKeyDown={handleInputKeyDown}
                            placeholder="Village ID"
                          />
                          {field.state.meta.isTouched &&
                            field.state.meta.errors.length > 0 && (
                              <p className="text-xs text-red-600">
                                {field.state.meta.errors[0]}
                              </p>
                            )}
                        </div>
                      )}
                    />
                  </div>

                  <form.Field
                    name="merchant_address"
                    validators={{
                      onChange: ({ value }) => {
                        const result =
                          stepSchemas[1].shape.merchant_address.safeParse(
                            value,
                          );
                        return result.success
                          ? undefined
                          : result.error.errors[0].message;
                      },
                      onBlur: ({ value }) => {
                        const result =
                          stepSchemas[1].shape.merchant_address.safeParse(
                            value,
                          );
                        return result.success
                          ? undefined
                          : result.error.errors[0].message;
                      },
                    }}
                    children={(field) => (
                      <div className="space-y-2">
                        <Label htmlFor={field.name}>Address</Label>
                        <Input
                          id={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          onKeyDown={handleInputKeyDown}
                          placeholder="Street address"
                        />
                        {field.state.meta.isTouched &&
                          field.state.meta.errors.length > 0 && (
                            <p className="text-xs text-red-600">
                              {field.state.meta.errors[0]}
                            </p>
                          )}
                      </div>
                    )}
                  />

                  <form.Field
                    name="merchant_address_send"
                    validators={{
                      onChange: ({ value }) => {
                        const result =
                          stepSchemas[1].shape.merchant_address_send.safeParse(
                            value,
                          );
                        return result.success
                          ? undefined
                          : result.error.errors[0].message;
                      },
                      onBlur: ({ value }) => {
                        const result =
                          stepSchemas[1].shape.merchant_address_send.safeParse(
                            value,
                          );
                        return result.success
                          ? undefined
                          : result.error.errors[0].message;
                      },
                    }}
                    children={(field) => (
                      <div className="space-y-2">
                        <Label htmlFor={field.name}>Shipping Address</Label>
                        <Input
                          id={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          onKeyDown={handleInputKeyDown}
                          placeholder="Shipping address"
                        />
                        {field.state.meta.isTouched &&
                          field.state.meta.errors.length > 0 && (
                            <p className="text-xs text-red-600">
                              {field.state.meta.errors[0]}
                            </p>
                          )}
                      </div>
                    )}
                  />

                  <form.Field
                    name="merchant_zipcode"
                    validators={{
                      onChange: ({ value }) => {
                        const result =
                          stepSchemas[1].shape.merchant_zipcode.safeParse(
                            value,
                          );
                        return result.success
                          ? undefined
                          : result.error.errors[0].message;
                      },
                      onBlur: ({ value }) => {
                        const result =
                          stepSchemas[1].shape.merchant_zipcode.safeParse(
                            value,
                          );
                        return result.success
                          ? undefined
                          : result.error.errors[0].message;
                      },
                    }}
                    children={(field) => (
                      <div className="space-y-2">
                        <Label htmlFor={field.name}>Zipcode</Label>
                        <Input
                          id={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          onKeyDown={handleInputKeyDown}
                          placeholder="12345"
                        />
                        {field.state.meta.isTouched &&
                          field.state.meta.errors.length > 0 && (
                            <p className="text-xs text-red-600">
                              {field.state.meta.errors[0]}
                            </p>
                          )}
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                type="button"
                variant="ghost"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                Back
              </Button>

              <Button
                type="button"
                onClick={handleNextOrSubmit}
                className="flex items-center gap-2"
              >
                {currentStep === totalSteps - 1 ? 'Submit' : 'Next'}
                {currentStep < totalSteps - 1 && <ArrowRight size={16} />}
              </Button>
            </div>
          </div>
        </div>

        <p className="text-xs text-center text-gray-500 mt-6">
          Step {currentStep + 1} of {totalSteps}
        </p>
      </div>
    </div>
  );
}
