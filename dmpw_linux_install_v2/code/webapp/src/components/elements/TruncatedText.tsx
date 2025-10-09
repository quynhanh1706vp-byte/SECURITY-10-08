import React from 'react';
import { Tooltip } from 'antd';

interface TruncatedTextProps {
  text: string;
  maxLength?: number;
  tooltipPlacement?:
    | 'top'
    | 'left'
    | 'right'
    | 'bottom'
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight'
    | 'leftTop'
    | 'leftBottom'
    | 'rightTop'
    | 'rightBottom';
  tooltipMaxWidth?: number;
}

export const TruncatedText: React.FC<TruncatedTextProps> = ({
  text,
  maxLength = 50,
  tooltipPlacement = 'topLeft',
  tooltipMaxWidth = 800,
}) => {
  if (!text) return null;

  const processedText = text.replace(/<br\s*\/?>/g, '\n');

  const plainText = React.useMemo(() => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = processedText;
    return tempDiv.textContent || tempDiv.innerText || '';
  }, [processedText]);

  const displayText = plainText.length > maxLength ? `${plainText.slice(0, maxLength)}...` : plainText;

  const displayHtml = displayText.replace(/\n/g, '<br />');
  return (
    <Tooltip
      title={<div dangerouslySetInnerHTML={{ __html: processedText }} />}
      placement={tooltipPlacement}
      styles={{
        root: {
          maxWidth: `${tooltipMaxWidth}px`,
          whiteSpace: 'pre-line',
          wordBreak: 'break-word'
        }
      }}
      mouseEnterDelay={0.1}
      mouseLeaveDelay={0.1}
      trigger='hover'
    >
      <div
        className='inline-block max-w-full cursor-pointer'
        style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
        dangerouslySetInnerHTML={{ __html: displayHtml }}
      />
    </Tooltip>
  );
};
