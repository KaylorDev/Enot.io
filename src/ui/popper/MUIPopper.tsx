import { Popper } from "@mui/material";

type TMUIPopperProps = {
  open: boolean;
  anchorEl: Element | null;
  content: any;
  popperRef: React.RefObject<HTMLDivElement> | null;
};

export function MUIPopper({
  anchorEl,
  content,
  open,
  popperRef,
}: TMUIPopperProps) {
  return (
    <Popper
      ref={popperRef}
      placement="left-start"
      open={open}
      anchorEl={anchorEl}
    >
      {content}
    </Popper>
  );
}
