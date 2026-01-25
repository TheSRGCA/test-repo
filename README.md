# Blackjack Card Counting Trainer

A comprehensive web application to help you master card counting in blackjack. Learn basic strategy, the Hi-Lo counting system, and strategy deviations with an interactive trainer.

## Features

### Basic Strategy Training
- Complete basic strategy charts for hard totals, soft totals, and pair splitting
- Interactive practice mode to test your knowledge
- Visual feedback for correct/incorrect decisions
- Covers all common rule variations (H17/S17, DAS, surrender, etc.)

### Hi-Lo Card Counting System
- Learn the most popular and effective counting system
- Real-time running count and true count display
- Practice counting through cards at various speeds
- Automatic deck penetration tracking
- Betting spread recommendations based on true count

### Strategy Deviations
- **Illustrious 18**: The most valuable playing deviations
- **Fab 4**: Essential surrender deviations
- Real-time deviation alerts during play
- Shows when to deviate from basic strategy based on count

### Casino Hand Signals
- Learn authentic casino hand signals for all actions:
  - **Hit**: Tap or scratch the table
  - **Stand**: Wave hand horizontally
  - **Double Down**: Place extra bet, point one finger
  - **Split**: Place extra bet, make V sign
  - **Surrender**: Draw line behind bet

### Customizable Game Rules
- Number of decks (1, 2, 4, 6, or 8)
- Dealer hits/stands on soft 17
- Double after split (DAS)
- Resplit aces
- Late surrender
- Blackjack payout (3:2 or 6:5)
- Deck penetration settings

### Statistics Tracking
- Hands played, won, lost, and pushed
- Win rate percentage
- Strategy decision accuracy
- Chip balance tracking

## Getting Started

```bash
# Navigate to the project directory
cd blackjack-trainer

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## How to Use

### Play Mode
Practice your skills in a realistic blackjack game with optional strategy hints and count display.

### Learn Mode
Study the theory behind card counting:
- Basic Strategy charts and concepts
- Hi-Lo counting system explained
- Strategy deviations and when to use them
- Casino hand signal guide

### Practice Mode
Drill specific skills:
- **Card Counting**: Count through random cards and verify your count
- **Basic Strategy**: Test your knowledge of correct plays
- **Speed Counting**: Count through an entire deck as fast as possible

## The Hi-Lo System

| Cards | Value |
|-------|-------|
| 2-6   | +1    |
| 7-9   | 0     |
| 10-A  | -1    |

**Running Count**: Sum of all card values seen
**True Count**: Running Count ÷ Decks Remaining

## Technology

- React 18
- Vite
- TailwindCSS
- Pure JavaScript (no external game libraries)

## License

MIT
