import {ElementType, forwardRef, HTMLAttributes} from 'react';

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({level = 1, className, ...props}, ref) => {
    const HeadingTag = `h${level}` as ElementType;
    return <HeadingTag className={className} {...props} ref={ref} />;
  }
);
