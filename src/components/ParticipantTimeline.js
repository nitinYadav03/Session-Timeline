import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMicrophone,
  faDesktop,
  faAngleRight,
  faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import VideocamOffOutlinedIcon from '@mui/icons-material/VideocamOffOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const formatTime = (time) => {
  return new Date(time).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
  });
};

const calculateDuration = (start, end) => {
  const diff = new Date(end) - new Date(start);
  return Math.ceil(diff / 60000); // Duration in minutes
};
export const ParticipantTimeline = ({
  participant,
  sessionStart,
  sessionEnd,
}) => {
  const calculatePosition = (time) => {
    const sessionDuration = new Date(sessionEnd) - new Date(sessionStart);
    return ((new Date(time) - new Date(sessionStart)) / sessionDuration) * 100;
  };

  return (
    <div className="relative py-4 border-b border-gray-700">
      {/* Participant Info */}
      <div className="flex justify-between">
        <div className="flex flex-col gap-1 mb-5">
          <span className="font-medium text-white">
            {participant.name.charAt(0).toUpperCase() +
              participant.name.slice(1).toLowerCase()}{' '}
            ({participant.participantId})
          </span>
          <span className="text-sm text-gray-400">
            {new Date(participant.timelog[0]?.start).toLocaleDateString(
              'en-GB',
              { day: '2-digit', month: 'long', year: 'numeric' }
            ) + ', '}
            {formatTime(participant.timelog[0]?.start)} | Duration:{' '}
            {calculateDuration(
              participant.timelog[0]?.start,
              participant.timelog[participant.timelog.length - 1].end
            )}{' '}
            Min
          </span>
        </div>
        <div>
          <span className="text-medium text-[#5568FE] cursor-pointer">
            View details
            <FontAwesomeIcon
              className="px-1.5 size-4 mb-[-1.5px]"
              icon={faAngleRight}
            />
          </span>
        </div>
      </div>

      {/* Participant Timeline */}
      {/* Timeline Bar */}
      <div className="timeline-bar rounded h-1.5 relative">
        {/* Timelog (Active Session Bar) */}
        {participant.timelog?.map((log, idx) => (
          <div
            key={idx}
            className="absolute bg-[#5568FE] h-1.5 rounded"
            style={{
              left: `${calculatePosition(log.start)}%`,
              width: `${
                calculatePosition(log.end) - calculatePosition(log.start)
              }%`,
            }}
          />
        ))}

        {participant.timelog?.map((log, idx) => (
          <React.Fragment key={idx}>
            {/* Join Time */}
            <div
              className="tooltip-container bg-gray-500"
              style={{
                left: `${calculatePosition(log.start)}%`,
              }}
            >
              <FontAwesomeIcon icon={faDesktop} className="text-white size-3.5 hover:brightness-90" />
              <div className="tooltip">Join</div>
            </div>

            {/* Leave Time */}
            <div
              className="tooltip-container bg-gray-500"
              style={{
                left: `${calculatePosition(log.end)}%`,
              }}
            >
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                className="text-white size-3.5 hover:brightness-90"
              />
              <div className="tooltip">Exit</div>
            </div>
          </React.Fragment>
        ))}

        {/* Start and End Events for Mic */}
        {participant.events.mic?.map((micEvent, idx) => (
          <React.Fragment key={idx}>
            {/* Mic On Event */}
            <div
              className="tooltip-container bg-[#5568FE]"
              style={{ left: `${calculatePosition(micEvent.start)}%` }}
            >
              <FontAwesomeIcon
                icon={faMicrophone}
                className="text-white hover:brightness-90"
              />
              <div className="tooltip">Mic On</div>
            </div>
            {/* Mic Off Event */}
            <div
              className="tooltip-container bg-[#5568FE]"
              style={{ left: `${calculatePosition(micEvent.end)}%` }}
            >
              <MicOffIcon fontSize='small' className="text-white hover:brightness-90" />
              <div className="tooltip">Mic Off</div>
            </div>
          </React.Fragment>
        ))}

        {/* Start and End Events for Webcam */}
        {participant.events.webcam?.map((webcamEvent, idx) => (
          <React.Fragment key={idx}>
            {/* Webcam On Event */}
            <div
              className="tooltip-container bg-[#5568FE]"
              style={{ left: `${calculatePosition(webcamEvent.start)}%` }}
            >
              <VideocamOutlinedIcon fontSize='small' className="text-white hover:brightness-90" />
              <div className="tooltip">Webcam On</div>
            </div>
            {/* Webcam Off Event */}
            <div
              className="tooltip-container bg-[#5568FE]"
              style={{ left: `${calculatePosition(webcamEvent.end)}%` }}
            >
              <VideocamOffOutlinedIcon fontSize='small' className="text-white hover:brightness-90" />
              <div className="tooltip">Webcam Off</div>
            </div>
          </React.Fragment>
        ))}

        {/* Start and End Events for Screen Sharing */}
        {participant.events.screenShare?.map((screenShareEvent, idx) => (
          <React.Fragment key={idx}>
            {/* Screen Share Start */}
            <div
              className="tooltip-container bg-blue-500 "
              style={{ left: `${calculatePosition(screenShareEvent.start)}%` }}
            >
              <FontAwesomeIcon
                icon={faDesktop}
                className="text-white hover:brightness-90"
              />
              <div className="tooltip">Screen Share Start</div>
            </div>
            {/* Screen Share End */}
            <div
              className="tooltip-container bg-gray-500"
              style={{ left: `${calculatePosition(screenShareEvent.end)}%` }}
            >
              <FontAwesomeIcon
                icon={faDesktop}
                className="text-white hover:brightness-90"
              />
              <div className="tooltip">Screen Share End</div>
            </div>
          </React.Fragment>
        ))}

        {/* Error Events */}
        {participant.events.errors?.map((errorEvent, idx) => (
          <div
            key={idx}
            className="tooltip-container bg-[#F17676]"
            style={{ left: `${calculatePosition(errorEvent.start)}%` }}
          >
            <ErrorOutlineIcon fontSize='small' className="text-white hover:brightness-90" />
            <div className="tooltip">{errorEvent.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
