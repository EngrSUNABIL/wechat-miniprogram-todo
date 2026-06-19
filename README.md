# WeChat Mini Program - Todo App

A simple and elegant Todo application built with WeChat Mini Program.

## Features

✅ Add new todos
✅ Mark todos as completed
✅ Delete todos
✅ Persistent storage using WeChat local storage
✅ View completion statistics
✅ Clean and user-friendly UI

## Project Structure

```
wechat-miniprogram-todo/
├── app.json              # Global configuration
├── app.js                # App lifecycle
├── app.wxss              # Global styles
├── pages/
│   ├── index/            # Main Todo page
│   │   ├── index.wxml
│   │   ├── index.js
│   │   ├── index.wxss
│   │   └── index.json
│   └── logs/             # Logs page (optional)
│       ├── logs.wxml
│       ├── logs.js
│       ├── logs.wxss
│       └── logs.json
├── sitemap.json          # Sitemap for indexing
└── README.md
```

## Getting Started

### Prerequisites
- WeChat Developer Tools (Download from [here](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html))
- WeChat account with developer registration

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/EngrSUNABIL/wechat-miniprogram-todo.git
   ```

2. Open WeChat Developer Tools

3. Click "Import Project"

4. Select the project folder

5. Enter your App ID (use a test ID if you don't have one yet)

6. Click "Open"

7. Click the "Compile" button to preview

## Usage

1. **Add a Todo**: Type in the input field and click "Add" or press Enter
2. **Mark as Complete**: Tap on the todo item to toggle completion status
3. **Delete**: Click the "Delete" button next to the todo
4. **View Stats**: See total and completed todos at the bottom

## Data Storage

Todos are stored in WeChat's local storage (`wx.setStorageSync` / `wx.getStorageSync`), so they persist between app sessions.

## Todo Data Structure

```javascript
{
  id: number,           // Unique timestamp-based ID
  text: string,         // Todo text
  completed: boolean,   // Completion status
  createdAt: string     // Creation timestamp
}
```

## Deployment

1. Register your WeChat mini program on the [Official Platform](https://mp.weixin.qq.com/)
2. Get your App ID
3. Update the App ID in WeChat Developer Tools
4. Click "Upload" to submit for review
5. Once approved, your mini program will be available to users

## Future Enhancements

- [ ] Add categories/tags
- [ ] Set reminders/notifications
- [ ] Dark mode support
- [ ] Cloud storage backup
- [ ] Sharing todos with other users
- [ ] Due date functionality
- [ ] Priority levels

## API Reference

### WeChat APIs Used

- `wx.setStorageSync()` - Save data locally
- `wx.getStorageSync()` - Retrieve stored data
- `wx.showToast()` - Display notifications
- `wx.showModal()` - Show confirmation dialogs
- `wx.navigateBack()` - Navigate to previous page

## License

MIT License - Feel free to use this project for your own purposes!

## Support

For questions or issues, please open an issue on GitHub.

## Resources

- [WeChat Mini Program Official Docs](https://developers.weixin.qq.com/miniprogram/en/docs/)
- [WeChat API Reference](https://developers.weixin.qq.com/miniprogram/en/docs/reference/)
- [Design Guidelines](https://developers.weixin.qq.com/miniprogram/en/design/)
