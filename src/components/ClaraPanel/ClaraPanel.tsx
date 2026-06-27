import { cn } from '../../lib/cn';
import type { ProtonicClaraPanelProps } from './ClaraPanel.types';
import styles from './ClaraPanel.module.css';

/** Clara AI chat panel. Compound component — use ClaraPanel.Header, .Messages, .Bubble, .InputDock sub-components. */
export function ClaraPanel({ className, children, ...props }: ProtonicClaraPanelProps) {
  return (
    <div className={cn(styles.panel, className)} {...props}>
      {children}
    </div>
  );
}

ClaraPanel.Header   = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn(styles.header, className)} {...props}>{children}</div>
);
ClaraPanel.Identity = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn(styles.identity, className)} {...props}>{children}</div>
);
ClaraPanel.Avatar   = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn(styles.avatar, className)} {...props}>{children}</div>
);
ClaraPanel.Name     = ({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn(styles.name, className)} {...props}>{children}</p>
);
ClaraPanel.Tagline  = ({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn(styles.tagline, className)} {...props}>{children}</p>
);
ClaraPanel.Messages = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn(styles.messages, className)} {...props}>{children}</div>
);
ClaraPanel.BubbleRow = ({ user = false, className, children, ...props }: React.HTMLAttributes<HTMLDivElement> & { user?: boolean }) => (
  <div className={cn(styles.bubbleRow, user && styles.bubbleRowUser, className)} {...props}>{children}</div>
);
ClaraPanel.Bubble   = ({ user = false, className, children, ...props }: React.HTMLAttributes<HTMLDivElement> & { user?: boolean }) => (
  <div className={cn(styles.bubble, user && styles.bubbleUser, className)} {...props}>{children}</div>
);
ClaraPanel.InputDock = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn(styles.inputDock, className)} {...props}>{children}</div>
);
ClaraPanel.InputRow  = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn(styles.inputRow, className)} {...props}>{children}</div>
);
ClaraPanel.Textarea  = ({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea className={cn(styles.textarea, className)} {...props} />
);
ClaraPanel.Disclaimer = ({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn(styles.disclaimer, className)} {...props}>{children}</p>
);
