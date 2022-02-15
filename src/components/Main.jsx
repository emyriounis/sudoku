import { useEffect, useState } from "react";
import { Alert, Container, Form, Table } from "react-bootstrap";

const Main = () => {
  const [values, setValues] = useState([]);
  const [result, setResult] = useState(false);

  useEffect(
    () =>
      setValues([
        [5, 3, null, null, 7, null, null, null, null],
        [6, null, null, 1, 9, 5, null, null, null],
        [null, 9, 8, null, null, null, null, 6, null],
        [8, null, null, null, 6, null, null, null, 3],
        [4, null, null, 8, null, 3, null, null, 1],
        [7, null, null, null, 2, null, null, null, 6],
        [null, 6, null, null, null, null, 2, 8, null],
        [null, null, null, 4, 1, 9, null, null, 5],
        [null, null, null, null, 8, null, null, 7, 9],
      ]),
    []
  );

  const validate = () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    // row
    const rowCheck = !arr
      .map((num) => values.map((row) => row.includes(num)))
      .find((i) => !i);

    //col
    const colCheck = !arr
      .map((num) =>
        arr
          .map((index) => values.filter((row) => row[index - 1])) // reshape
          .map((newRow) => newRow.includes(num))
      )
      .find((i) => !i);

    // 3x3
    let boxCheck = true;

    for (let i = 0; i < 3; i++) {
      const threeRows = values.slice(i, i + 3);
      for (let j = 0; j < 3; j++) {
        const box = threeRows.splice(j, j + 3).flat();
        const valid = !arr.map((num) => box.includes(num)).find((i) => !i);
        if (!valid) {
          boxCheck = false;
        }
      }
    }

    rowCheck && colCheck && boxCheck && setResult(true);
  };

  useEffect(
    () =>
      !values.find((row) => row.includes(null)) ? validate() : setResult(false),
    [values]
  );

  return (
    <Container className="p-5">
      <Table striped bordered hover>
        {/* <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead> */}
        <tbody>
          {values.map((row, indexRow) => (
            <tr key={indexRow}>
              {row.map((col, indexCol) => (
                <td key={`${indexRow}-${indexCol}`}>
                  <Form>
                    <Form.Group>
                      <Form.Control
                        type="number"
                        placeholder=""
                        value={col || ""}
                        onChange={(event) => {
                          const val = [...values];
                          if (
                            (event.target.value >= 1 &&
                              event.target.value <= 9) ||
                            event.target.value === ""
                          ) {
                            val[indexRow][indexCol] = event.target.value;
                            setValues(val);
                          }
                        }}
                      />
                    </Form.Group>
                  </Form>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <Alert variant="primary">{result ? "Success" : "Try again"}</Alert>
    </Container>
  );
};

export default Main;
