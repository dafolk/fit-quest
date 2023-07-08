const instructions = {
  start: <div>Move into the frame to start</div>,
  hand: (
    <div>
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
      circle with your{" "}
      <span className="highlight">
        {" "}
        Hands{" "}
        <style jsx>{`
          .highlight {
            color: #fcc732;
          }
        `}</style>
      </span>
    </div>
  ),
  knee: (
    <div>
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
      circle with your{" "}
      <span className="highlight">
        {" "}
        Knees{" "}
        <style jsx>{`
          .highlight {
            color: #ff0000;
          }
        `}</style>
      </span>
    </div>
  ),
};

export default instructions;
