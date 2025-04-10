import { FC } from "react";
import "../../scss/status-widget.scss";

interface InputProps {
  status: number;
}

const StatusWidget: FC<InputProps> = ({ status }) => {
  return (
    <>
      {status === 1 ? (
        <>
          <div className="status-wrapper">
            <div className="dotted-div approved"></div>
            <h6>Approved</h6>
          </div>
        </>
      ) : (
        <></>
      )}

      {status === 0 ? (
        <>
          <div className="status-wrapper">
            <div className="dotted-div failed"></div>
            <h6>Pending</h6>
          </div>
        </>
      ) : (
        <></>
      )}

      {status === 2 ? (
        <>
          <div className="status-wrapper">
            <div className="dotted-div pending"></div>
            <h6>Pending</h6>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default StatusWidget;
