let price = 0.007; // harga awal BOC COIN USD
let lastUpdate = Date.now();

function randomBool() {
  return Math.random() > 0.5;
}

function randomPercentage() {
  return Math.random() * (3 - 1) + 1; // 1% s.d 3%
}

function simulatePrice() {
  const step = 0.002; // tahapan kecil
  const increase = randomBool();
  let percentage = randomPercentage();

  while (percentage > 0) {
    let delta = Math.min(step, percentage);
    if (increase) {
      price += price * (delta / 100);
    } else {
      price -= price * (delta / 100);
    }
    percentage -= delta;
  }
  lastUpdate = Date.now();
}

// Update setiap 5 detik (bisa disesuaikan)
setInterval(simulatePrice, 5000);

export default function handler(req, res) {
  res.json({
    price: price.toFixed(6),
    timestamp: lastUpdate,
  });
}
