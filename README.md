# ❄️ Flurry: Get Debt Free, One Flake at a Time

> Flurry is a minimalistic app to track, manage, and pay off your debts using the debt snowball method. Currently a demo project.

## Features

- **Track all debts**: credit cards, student loans, and personal debts with custom names, balances, minimum payments, and interest rates.
- **Progress visualization**: View intuitive progress bars, percent paid, and time remaining.
- **Freedom forecasting**: See your projected debt-free date, plus dates for every debt, based the debt snowball method.
- **Payment history**: Log past payments, view totals, and monitor monthly minimums.
- **Local first**: In current demo mode, all data is stored on-device.

## Technical Stack

- **React Native** with TypeScript and Expo
- **Zustand** for state management
- **AsyncStorage** for local data
- **Gluestack UI** for components

## Future Opportunities

- **Better Android UI**: Currently only tested on iOS.
- **Cloud Sync**: I'd like to set this up with a backend eventually so data can be persistent across devices.
- **Better Payment Tracking**: I'd like to do deeper payment integration with debts to affect projections and balance without manual updates.
- **Avalanche Option**: For sorting debts by interest rate, rather than balance like the traditional snowball method.
- **Goal-Based Scenarios**: What-if simulators for paying more or changing interest.

## Getting Started

```bash
# clone the repo
npm install
npx expo start
```
