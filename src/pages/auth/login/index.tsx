import LOGO_LOKA_ARUNIKA from '@/assets/Logo-Horizontal/SVG/loka-arunika-logo-horizontal-primary.svg';
import { z } from 'zod';
import { EyeIcon, EyeSlashIcon } from '@phosphor-icons/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { useForm } from '@tanstack/react-form';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const formSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

function Index() {
  const [isVisible, setIsVisible] = useState(false);

  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      console.info(`hasil : ${value}`);
    },
  });

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="min-h-svh flex justify-center items-center">
      <div className="flex flex-col items-center justify-start max-w-sm p-4 sm:border-4 border-primary rounded-md sm:shadow-primary sm:shadow-2xl">
        <img
          src={LOGO_LOKA_ARUNIKA}
          className="w-full max-w-sm aspect-video"
          alt="Logo Loka Arunika"
        />
        <div className="w-full space-y-8">
          <div className="flex flex-col items-center gap-2 w-full">
            <p className="text-sm font-bold">Login to your account</p>
            <p className="text-xs text-center">
              Enter your email below to login to your account
            </p>
          </div>
          <form className="flex flex-col items-center gap-6 w-full">
            <FieldGroup>
              <form.Field
                name="email"
                children={(field) => {
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="b@domain.com"
                        autoComplete="off"
                      />
                    </Field>
                  );
                }}
              />
              <form.Field
                name="password"
                children={(field) => {
                  return (
                    <Field>
                      <div className="flex flex-row items-center justify-between">
                        <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                        <p className="text-xs cursor-pointer hover:underline underline-offset-4">
                          forgot password?
                        </p>
                      </div>
                      <div className="relative">
                        <Input
                          id={field.name}
                          name={field.name}
                          type={isVisible ? 'text' : 'password'}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="******"
                          autoComplete="off"
                        />

                        <Button
                          variant="ghost"
                          onClick={toggleVisibility}
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                          aria-label={
                            isVisible ? 'Hide password' : 'Show password'
                          }
                        >
                          {isVisible ? (
                            <EyeSlashIcon size={20} />
                          ) : (
                            <EyeIcon size={20} />
                          )}
                        </Button>
                      </div>
                    </Field>
                  );
                }}
              />
            </FieldGroup>
            <Button
              className="w-full py-4"
              type="submit"
              form="bug-report-form"
            >
              Login
            </Button>
          </form>
          <p className="text-xs text-center">
            Don't have an account?{' '}
            <span
              className="text-primary underline underline-offset-4 cursor-pointer"
              onClick={() => {
                navigate('/register');
              }}
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Index;
