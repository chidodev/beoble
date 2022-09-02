import React from "react";

interface ButtonProps {
  link?: string | null;
  onClick?: null | (() => void);
  header: React.ReactNode;
  subheader?: React.ReactNode;
  icon: string;
  active?: boolean;
  id: string;
}

export default function Button({
  link = null,
  onClick = null,
  header,
  subheader = null,
  icon,
  active = false,
}: ButtonProps): JSX.Element {
  const content = (
    <button className="wallet-button" onClick={() => onClick && onClick()}>
      <div className="wallet-label">
        <p className="label-header">
            {header}
        </p>
        {
            subheader && (
                <p className="label-sub">{subheader}</p>
            )
        }
        
      </div>
      <div className="wallet-avatar">
        <img alt="" src={icon} className="wallet-image" />
      </div>
    </button>
  );

  if (link) {
    return <a target="_blank" href={link}>{content}</a>;
  }

  return content;
}
