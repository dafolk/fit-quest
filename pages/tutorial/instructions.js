const instructions = {
  start: <span>Move into the frame to start</span>,
  hand: (
    <span>
      Try to touch the
      <span className="highlight">
        {" "}
        Yellow{" "}
        <style jsx>{`
          .highlight {
            color: #fcc732;
          }
        `}</style>
      </span>
      circle with your
      <span className="highlight">
        {" "}
        Hands{" "}
        <style jsx>{`
          .highlight {
            color: #fcc732;
          }
        `}</style>
      </span>
    </span>
  ),
  knee: (
    <span>
      Try to touch the{" "}
      <span className="highlight">
        {" "}
        Red{" "}
        <style jsx>{`
          .highlight {
            color: #ff0000;
          }
        `}</style>
      </span>
      circle with your
      <span className="highlight">
        {" "}
        Knees{" "}
        <style jsx>{`
          .highlight {
            color: #ff0000;
          }
        `}</style>
      </span>
    </span>
  ),
};

export default instructions;
