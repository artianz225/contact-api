import  express  from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();
const PORT = 3001;

morgan.token('body', function(req, res) {
  return JSON.stringify(req.body)
})

app.use(express.json());
app.use(cors());
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body'));
app.use(express.static('dist'))

let persons = [
  {
    id: 1,
    name: "Arthur",
    number: "09311218228"
  },
  {
    id: 2,
    name: "Daine Rose",
    number: "09311218228"
  },
  {
    id: 3,
    name: "Salve Marie",
    number: "09311218228"
  },
  {
    id: 4,
    name: "John Doe",
    number: "09311218228"
  },
  {
    id: 5,
    name: "Leon Kenedy",
    number: "09311218228"
  },
  {
    id: 6,
    name: "Ada Wong",
    number: "09311218228"
  },
  {
    id: 7,
    name: "Jackie Chan",
    number: "09311218228"
  },
  {
    id: 8,
    name: "Horry Potter",
    number: "09311218228"
  },
  {
    id: 9,
    name: "Ashly Graham",
    number: "09311218228"
  },
  {
    id: 10,
    name: "Jack Cruiser",
    number: "09311218228"
  },
]

function unknownEndPoint(request, response) {
  response.status(404).send({ error: "unknown endpoint"});
}

function requestLogger(request, response, next) {
  console.log(`Method: ${request.method}`);
  console.log(`Path: ${request.path}`);
  console.log(`Body:`, request.body);
  next();
}

function generateId () {
  const maxId = persons.length > 0 ? Math.max(...persons.map(p => p.id )) 
  : 0

  return maxId + 1;
}


app.get("/", (request, response) => {
  response.send("<h1>Hello!!!!</hd>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  response.json(person);
});

app.post("/api/persons", (request, response) => {
  const body = request.body

   if (!body.name) {
    return response.status(400).json({error: "missing"})
   }

  const newpersons = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons = persons.concat(newpersons)

  response.status(201).json(newpersons);
  });

  app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter((person) => person.id !== id);
  
    response.status(204).end();
  })

app.use(unknownEndPoint);
  

app.listen(PORT, () => {
  console.log(`Server is live ${PORT}`);
});