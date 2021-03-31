import React from 'react';
// import Button from 'react-bootstrap/Button';

export default class Tag extends React.Component {
  render() {
    return (
      <>
        {/* 1. Tag Buttons */}
        <div id="tags">
          <div id="allTags">
            <h2>All tags</h2>

            {/* 1-1. All Button */}
            <button
              id="allTagButton"
              onClick={() => this.props.getNotesByTags()}
              variant="primary"
              size="lg"
            >
              All
            </button>

            {/* 1-2. Rest of the buttons */}
            {this.props.unduplicatedTagsArray.map((tag, key) => (
              <div key={key} id="individualTag">
                <button
                  id="individualTagButton"
                  onClick={() => this.props.getFilteredTags(tag)}
                >
                  {tag}
                </button>
              </div>
            ))}
            <br />
          </div>
          {/* ------------------------------------------------------------------------------------------ */}
          {/* 2. Filtered tag buttons */}
          <div id="filteredTags">
            <h2>Filtered tags</h2>
            {this.props.filteredTags.map((filteredTag, key) => (
              <button
                id="filteredTagButton"
                key={key}
                onClick={() => this.props.removeFilteredTags(key)}
              >
                {filteredTag} ❌
              </button>
            ))}
          </div>
        </div>
      </>
    );
  }
}
