import { cn } from '../../lib/cn';
import { claraPanelStyles } from './ClaraPanel.styles';
import type { ProtonicClaraPanelProps } from './ClaraPanel.types';
import './ClaraPanel.css';

export function ClaraPanel({ className, children, ...props }: ProtonicClaraPanelProps) {
  return (
    <div className={cn(claraPanelStyles(), className)} {...props}>
      {children}
    </div>
  );
}
