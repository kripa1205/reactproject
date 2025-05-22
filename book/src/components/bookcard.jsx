import React from "react";
import { Card } from "react-bootstrap";

const BookCard = ({ book }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={book.imageLinks?.thumbnail} />
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Text>
          <strong>Author:</strong> {book.authors?.join(", ")}
        </Card.Text>
        <Card.Text>{book.description?.slice(0, 100)}...</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default BookCard;
