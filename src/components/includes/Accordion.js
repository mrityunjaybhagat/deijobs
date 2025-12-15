export const Accordion = ({ id, children }) => {
  return (
    <div className="accordion" id={id}>
      {children}
    </div>
  );
};

export const AccordionItem = ({ parentId, itemId, title, isOpen, children }) => {
  const headingId = `heading-${itemId}`;
  const collapseId = `collapse-${itemId}`;

  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id={headingId}>
        <button
          className={`accordion-button ${!isOpen ? "collapsed" : ""}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#${collapseId}`}
          aria-expanded={isOpen ? "true" : "false"}
          aria-controls={collapseId}
        >
          {title}
        </button>
      </h2>
      <div
        id={collapseId}
        className={`accordion-collapse collapse ${isOpen ? "show" : ""}`}
        aria-labelledby={headingId}
        data-bs-parent={`#${parentId}`}
      >
        <div className="accordion-body">{children}</div>
      </div>
    </div>
  );
};
