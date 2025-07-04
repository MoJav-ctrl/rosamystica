const express = require('express');
const path = require('path');
const app = express();

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Maria Rosa Mystica Catholic Church',
    // Sample data - in a real app this would come from a database
    bibleReading: {
      firstReading: "Genesis 1:1-2:2",
      psalm: "Psalm 104:1-2, 5-6, 10, 12, 13-14, 24, 35",
      secondReading: "Romans 6:3-11",
      gospel: "Matthew 28:1-10"
    },
    announcements: [
      "Easter Sunday Mass at 10:00 AM",
      "Confessions every Saturday 3:00-4:00 PM",
      "Parish picnic on June 15th"
    ],
    clergy: [
      {
        name: "Rev. Fr. Donatus Onuigbo",
        role: "Parish Priest",
        image: "priest1.jpeg"
      },
      {
        name: "Rev. Fr. Michael Johnson",
        role: "Assistant Parish Priest",
        image: "priest2.jpeg"
      }
    ],
    activities: [
      { name: "Daily Mass", time: "8:00 AM", days: "Mon-Sat" },
      { name: "Sunday Mass", time: "9:00 AM, 11:00 AM", days: "Sun" },
      { name: "Bible Study", time: "7:00 PM", days: "Wed" },
      { name: "Youth Group", time: "6:30 PM", days: "Fri" }
    ]
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});