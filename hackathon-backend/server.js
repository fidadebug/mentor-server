const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

let activeTicket = {
  status: "grey",
  tableNo: "",
  teamName: "",
  description: ""
};

app.get('/tickets/active-ticket', (req, res) => {
  res.json(activeTicket);
});

app.patch('/tickets/active-ticket', (req, res) => {
  const { status, tableNo, teamName, description } = req.body;

  if (status) activeTicket.status = status;
  if (tableNo !== undefined) activeTicket.tableNo = tableNo;
  if (teamName !== undefined) activeTicket.teamName = teamName;
  if (description !== undefined) activeTicket.description = description;

  res.json({ message: "Ticket updated", activeTicket });
});

app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});