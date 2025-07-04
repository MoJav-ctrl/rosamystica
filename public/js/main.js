// Simple script for mobile menu toggle (can be expanded)
document.addEventListener('DOMContentLoaded', function() {
  // You can add interactive features here
  console.log('Church website loaded');
  
  // Example: Highlight current day in activities table
  const today = new Date().getDay();
  const daysMap = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const todayAbbr = daysMap[today];
  
  document.querySelectorAll('.activity-table td:nth-child(2)').forEach(cell => {
    if (cell.textContent.includes(todayAbbr)) {
      cell.parentElement.style.backgroundColor = '#8C593B';
    }
  });
});
