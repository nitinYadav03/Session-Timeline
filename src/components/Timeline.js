import React, { useState } from 'react';
import '../styles/timeline.css';
import { ParticipantTimeline } from './ParticipantTimeline';
import Header from './Header';

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
const Timeline = ({ meetingData }) => {
  const [toggle, setToggle] = useState(true);
  return (
    <div className="timeline-container px-4">
      {/* Header */}
      <Header toggle={toggle} setToggle={setToggle} />
      {toggle && (
        <>
          {/* Time Axis */}
          <div className="time-axis flex justify-between items-center border-gray-800 border-b border-solid py-5">
            {Array.from(
              { length: calculateDuration(meetingData.start, meetingData.end) + 1 },
              (_, i) => (
                <span key={i} className="text-xs text-gray-300">
                  {formatTime(
                    new Date(new Date(meetingData.start).getTime() + i * 60000)
                  )}
                </span>
              )
            )}
          </div>

          {/* Participant Timelines */}
          {meetingData.participantArray.map((participant) => (
            <ParticipantTimeline
              key={participant.participantId}
              participant={participant}
              sessionStart={meetingData.start}
              sessionEnd={meetingData.end}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Timeline;
