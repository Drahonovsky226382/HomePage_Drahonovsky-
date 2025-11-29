import { use, useEffect, useState } from "react";
import Badge from "react-bootstrap/Badge";

//Tohle je komponenta MyButton, definuji props abych je nemusel psát pak všude, defunuji stav
function MyButton(props) {
  const { backgroundColor = "blue", color = "red", onClick, children } = props;
  const [count, setCount] = useState(0);

  //hodnota kdy se to má useEffect vyvolat se dává na konec
  useEffect(() => {
    console.log("useEffect", count);
  });

  return (
    <button
      style={{ backgroundColor: backgroundColor, color: color }}
      //prevCount je funknce která při rychlém dvoukliknutí zabrání aby se přičetla pouze 1 protože se neredruje tak rychle
      onClick={() => setCount((prevCount) => prevCount + 1)}
    >
      {children}
      <h2>
        Example heading <Badge bg="secondary">{count}</Badge>
      </h2>
    </button>
  );
}

export default MyButton;

//Tohle vložím do funkce App za return
/* <div>
  <h1>Hello world</h1>
  <MyButton onClick={() => alert("Ahoj")}>Prvni tlacitko</MyButton>;
  <MyButton color="white" backgroundColor="black">
    Start
  </MyButton>
  ;<MyButton>Stop</MyButton>
</div>; */
