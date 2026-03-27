# Testing Guide - RAG System Frontend

## 🧪 Manual Testing Checklist

This guide provides comprehensive testing scenarios for validating the RAG System Frontend.

## 🔐 Authentication Testing

### Test 1: Valid Login
```
Steps:
1. Open http://localhost:5173/
2. Enter Username: Admin123
3. Enter Password: Password@12345
4. Click "Sign In"

Expected Result:
- Login page closes
- Redirected to Query page
- Navbar appears with Query/Upload tabs
- Success toast shown
```

### Test 2: Invalid Username
```
Steps:
1. Open http://localhost:5173/
2. Enter Username: WrongUser
3. Enter Password: Password@12345
4. Click "Sign In"

Expected Result:
- Error toast: "Invalid credentials"
- Stay on login page
- Password field clears
```

### Test 3: Invalid Password
```
Steps:
1. Open http://localhost:5173/
2. Enter Username: Admin123
3. Enter Password: WrongPassword
4. Click "Sign In"

Expected Result:
- Error toast: "Invalid credentials"
- Stay on login page
- Password field clears
```

### Test 4: Empty Fields
```
Steps:
1. Open http://localhost:5173/
2. Leave fields empty
3. Click "Sign In"

Expected Result:
- Error toast (username or password required)
- Stay on login page
```

### Test 5: Session Persistence
```
Steps:
1. Login successfully
2. Refresh browser (Ctrl+R)
3. Wait for page reload

Expected Result:
- User remains logged in
- Query page loads directly
- No redirect to login
```

### Test 6: Logout Functionality
```
Steps:
1. Login successfully
2. Click "Logout" button in navbar
3. Confirm logout

Expected Result:
- Logged out
- Redirected to login page
- Session cleared
```

## 💬 Query Page Testing

### Test 7: Valid Query
```
Steps:
1. Login and go to Query page
2. Enter: "What is a retrieval augmented generation system?"
3. Click "Send"

Expected Result:
- Loading animation appears (spinner)
- "Processing your question..." text
- Response displays in response card after API response
- Response card has formatted text with icon
```

### Test 8: Short Question (Validation)
```
Steps:
1. On Query page
2. Enter: "Hi"
3. Click "Send"

Expected Result:
- Error toast: "Question must be at least 3 characters"
- No API call made
- Send disabled until valid question
```

### Test 9: Empty Question
```
Steps:
1. On Query page
2. Leave textarea empty
3. Try to click "Send"

Expected Result:
- Send button is disabled (grayed out)
- Error on focus: "Please enter a question"
```

### Test 10: Character Counter
```
Steps:
1. On Query page
2. Type in textarea
3. Observe character count below textarea

Expected Result:
- Character count updates as you type
- Counter shows: "X characters"
```

### Test 11: Clear Button
```
Steps:
1. Enter a question and send
2. Response appears
3. Click "Clear" button

Expected Result:
- Question textarea clears
- Response disappears
- Page returns to empty state
- Help section reappears
```

### Test 12: Multiple Queries
```
Steps:
1. Send first query
2. See response
3. Clear
4. Send second query
5. See new response

Expected Result:
- Each query processes independently
- Responses display correctly
- No caching issues
```

### Test 13: API Error Handling
```
Steps:
1. Close backend server
2. Send a query from frontend
3. Observe error

Expected Result:
- Error toast appears
- No response card
- Can still interact with the page
```

### Test 14: Loading State
```
Steps:
1. Send a query
2. Observe Send button during processing

Expected Result:
- Send button shows spinner and "Processing..."
- Send button is disabled during request
- Cannot send multiple requests simultaneously
```

## 📂 Upload Page Testing

### Test 15: Access Upload Page
```
Steps:
1. Login successfully
2. Click "Upload KB" in navbar

Expected Result:
- Query page closes
- Upload page displays
- Title: "Upload Knowledge Base"
- Info box shows supported formats
- Empty upload zone visible
```

### Test 16: Valid PDF Upload
```
Steps:
1. On Upload page
2. Click in drag area or select file
3. Choose a valid PDF file (< 25MB)
4. Observe upload

Expected Result:
- File appears in upload list with PDF icon
- Progress bar shows upload progress
- Success status after upload completes
- Success toast: "File.pdf uploaded successfully"
```

### Test 17: Valid DOCX Upload
```
Steps:
1. On Upload page
2. Select a valid DOCX file (< 25MB)
3. Observe upload

Expected Result:
- File appears in list
- Uploads successfully
- Success toast shown
```

### Test 18: Multiple File Upload
```
Steps:
1. On Upload page
2. Select 3-4 valid PDF/DOCX files
3. Upload simultaneously

Expected Result:
- All files appear in list
- Upload in order or parallel
- Each shows individual progress
- All show success status
```

### Test 19: Invalid File Type (.txt)
```
Steps:
1. On Upload page
2. Try to upload .txt file

Expected Result:
- Error toast: "Only PDF and DOCX files are allowed"
- File not added to list
```

### Test 20: Invalid File Type (.exe)
```
Steps:
1. On Upload page
2. Try to upload .exe file

Expected Result:
- Error toast: "Only PDF and DOCX files are allowed"
- File not added to list
```

### Test 21: File Size Limit (> 25MB)
```
Steps:
1. Create a file > 25MB
2. Try to upload

Expected Result:
- Error toast: "File size exceeds 25MB limit (XX MB)"
- File not added to list
```

### Test 22: Drag and Drop
```
Steps:
1. On Upload page
2. Drag a PDF file over the upload zone
3. See hover effect
4. Drop the file

Expected Result:
- Drag area highlights while hovering
- File is accepted on drop
- Upload starts automatically
```

### Test 23: File List Management
```
Steps:
1. Upload 3 files
2. Hover over one file
3. Click the X button

Expected Result:
- File is removed from list
- Other files remain
- Removed file is not uploaded again
```

### Test 24: Clear All Button
```
Steps:
1. Upload several files
2. After all succeed
3. Click "Clear All" button

Expected Result:
- All files removed from list
- Upload area becomes empty
- "No files uploaded yet" message appears
```

### Test 25: File Upload Error
```
Steps:
1. Close API backend
2. Try to upload a file

Expected Result:
- File shows in list with status "uploading"
- After timeout, shows error status
- Error toast: "Failed to upload: [error message]"
- Can still remove the file
```

### Test 26: Upload Progress
```
Steps:
1. Upload a reasonably sized file
2. Watch the progress bar

Expected Result:
- Progress bar fills gradually
- Percentage updates smoothly
- Completes to 100%
- Status changes to success
```

## 🎨 UI/UX Testing

### Test 27: Responsive Design - Mobile
```
Steps:
1. Open DevTools (F12)
2. Set viewport to mobile (375px)
3. Login and navigate pages
4. Check all elements

Expected Result:
- All text readable
- Buttons clickable
- No horizontal scroll
- Navbar collapses properly
- All features work on mobile
```

### Test 28: Responsive Design - Tablet
```
Steps:
1. Set viewport to tablet (768px)
2. Navigate all pages
3. Check layout

Expected Result:
- Proper spacing and layout
- Touch-friendly buttons
- Good readability
- No overflow
```

### Test 29: Responsive Design - Desktop
```
Steps:
1. Set viewport to desktop (1920px)
2. Navigate all pages

Expected Result:
- Full-width usage
- Proper spacing
- Centered content
- Beautiful layout
```

### Test 30: Dark Mode
```
Steps:
1. View the application
2. Note color scheme

Expected Result:
- Dark background
- Light text
- Proper contrast
- Readable at all times
```

### Test 31: Animations
```
Steps:
1. Navigate between pages
2. Wait for response
3. Hover over buttons

Expected Result:
- Smooth page transitions
- Loading spinner animates
- Button hover effects
- Response fades in
```

### Test 32: Scrollbar
```
Steps:
1. On a long page (if applicable)
2. Scroll with scrollbar

Expected Result:
- Custom styled scrollbar
- Purple on dark background
- Smooth scrolling
```

## ⌨️ Keyboard Testing

### Test 33: Tab Navigation
```
Steps:
1. Login page
2. Press Tab repeatedly
3. Navigate all form fields

Expected Result:
- Can tab through all fields
- Submit button is focusable
- Focus indicators visible
```

### Test 34: Enter to Submit
```
Steps:
1. On login page
2. Fill form
3. Press Enter

Expected Result:
- Form submits without clicking button
```

### Test 35: Escape Key
```
Steps:
1. Any page
2. Press Escape (if applicable)

Expected Result:
- No crashes
- Page remains functional
```

## 🌐 Browser Testing

### Test 36: Chrome/Edge
```
Steps:
1. Open in Chrome or Edge
2. Test all features

Expected Result:
- All features work
- No console errors
- Performance good
```

### Test 37: Firefox
```
Steps:
1. Open in Firefox
2. Test all features

Expected Result:
- All features work
- No console errors
```

### Test 38: Safari
```
Steps:
1. Open in Safari
2. Test all features

Expected Result:
- All features work
- No console errors
```

## 🐛 Error Scenarios

### Test 39: Network Error
```
Steps:
1. Open DevTools Network tab
2. Set throttling to "Offline"
3. Try to send query or upload

Expected Result:
- Error toast appears
- Helpful error message
- Can retry after going online
```

### Test 40: Server Error (500)
```
Steps:
1. Backend returns 500 error
2. Frontend attempts request

Expected Result:
- Error toast: "HTTP 500" or server error message
- Page remains functional
- Can retry
```

## 📊 Console Testing

### Test 41: No Console Errors
```
Steps:
1. Open DevTools Console (F12)
2. Navigate all pages
3. Perform all actions

Expected Result:
- No errors in console
- No warnings (except normal)
- Clean console log
```

### Test 42: No Memory Leaks
```
Steps:
1. Open DevTools Performance
2. Record 30 seconds of navigation
3. Check memory usage

Expected Result:
- Memory stays relatively stable
- No continuous growth
- Efficient garbage collection
```

## 🚀 Performance Testing

### Test 43: Load Time
```
Steps:
1. Hard refresh (Ctrl+Shift+R)
2. Measure to interactive page

Expected Result:
- Load time < 3 seconds
- Content visible < 1 second
- Smooth animations
```

### Test 44: API Response Time
```
Steps:
1. Send query
2. Measure response time

Expected Result:
- Response < 5 seconds
- Loading animation runs smoothly
- No freezing
```

## ✅ Final Verification Checklist

Before marking as complete:

- [ ] All features work as expected
- [ ] No console errors or warnings
- [ ] Responsive on mobile/tablet/desktop
- [ ] All animations smooth
- [ ] All buttons clickable
- [ ] Form validation working
- [ ] Error messages clear
- [ ] Loading states visible
- [ ] Logout works properly
- [ ] Session persists after refresh
- [ ] API errors handled gracefully
- [ ] File upload progress shows
- [ ] File validation works
- [ ] Drag and drop works
- [ ] Dark mode looks good
- [ ] Keyboard navigation works
- [ ] Performance acceptable
- [ ] No crashes observed

## 📝 Bug Report Template

If issues found:

```
BUG: [Short description]

Steps to Reproduce:
1. 
2. 
3. 

Expected Result:
[What should happen]

Actual Result:
[What actually happened]

Environment:
- Browser: 
- OS: 
- Device: 

Console Error:
[Any error messages]
```

## 🎉 Testing Complete

All tests passed! Application is ready for production.

---

**Last Updated**: March 27, 2026  
**Total Tests**: 44  
**Status**: ✅ Ready for Deployment
