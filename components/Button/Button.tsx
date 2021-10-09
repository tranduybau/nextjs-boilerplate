import React from 'react'
import cx from 'classnames'
import { BaseButton, BaseButtonProps } from 'components/BaseButton'
import { IconSpinner } from 'components/icons/components/IconSpinner'
import { forwardRefWithAs, PropsWithAs } from 'components/Box'
import { ButtonAppearance } from '../BaseButton/types'
import { getappearanceButtonStyles } from '../BaseButton/utils'

export interface ButtonProps extends BaseButtonProps {
  appearance?: ButtonAppearance
  fullWidth?: boolean
  iconPosition?: 'left' | 'right'
  loading?: boolean
  disabled?: boolean
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
}

function getButtonStyles({
  size = 'md',
  fullWidth = false,
  loading,
  appearance,
}: ButtonProps) {
  const classNames = ['relative']

  if (fullWidth) {
    classNames.push('w-full flex')
  }

  if (loading) {
    classNames.push('cursor-default')
  }

  if (size === 'lg') {
    classNames.push('text-base')
  } else if (size === 'md') {
    classNames.push('text-sm')
  } else {
    classNames.push('text-xs')
  }

  if (appearance !== 'link') {
    if (size === 'lg') {
      classNames.push('py-4 px-6 px-8')
    } else if (size === 'md') {
      classNames.push('px-5 py-3 ')
    } else {
      classNames.push('py-2 px-4 px-5')
    }
  }

  return classNames
}

const ButtonComponent = (
  {
    size = 'md',
    appearance = 'default',
    Icon,
    iconPosition = 'left',
    children: originChildren,
    loading = false,
    asLabel = false,
    css,
    className,
    fullWidth = false,
    ...props
  }: PropsWithAs<ButtonProps>,
  ref: React.Ref<HTMLButtonElement>,
) => {
  let children = originChildren

  if (loading) {
    children = (
      <>
        <span className="absolute inset-0 flex items-center justify-center">
          <IconSpinner />
        </span>
        <span className="text-transparent">{children}</span>
      </>
    )
  } else if (Icon) {
    children = (
      <>
        {iconPosition === 'left' && <Icon className="mr-1.5" />}
        <span>{children}</span>
        {iconPosition === 'right' && <Icon className="ml-1.5" />}
      </>
    )
  }

  const passedInProps = { ...props, fullWidth, size, appearance, asLabel }

  return (
    <BaseButton
      ref={ref}
      {...props}
      className={cx(
        className,
        getButtonStyles(passedInProps),
        getappearanceButtonStyles(passedInProps),
      )}
    >
      {children}
    </BaseButton>
  )
}

export const Button = forwardRefWithAs<ButtonProps, any>(ButtonComponent)
