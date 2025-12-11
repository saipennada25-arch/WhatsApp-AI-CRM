# Test Baileys Backend

## Quick Test Commands

### 1. Test QR Generation
```bash
curl http://localhost:5001/generate-qr
```

### 2. Test Get Messages
```bash
curl http://localhost:5001/messages
```

### 3. Test Send Message
```bash
curl -X POST http://localhost:5001/send-message \
  -H "Content-Type: application/json" \
  -d "{\"number\":\"919876543210\",\"message\":\"Test message\"}"
```

## PowerShell Commands

### 1. Test QR Generation
```powershell
Invoke-RestMethod -Uri http://localhost:5001/generate-qr
```

### 2. Test Get Messages
```powershell
Invoke-RestMethod -Uri http://localhost:5001/messages
```

### 3. Test Send Message
```powershell
$body = @{
    number = "919876543210"
    message = "Test message from PowerShell"
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:5001/send-message -Method Post -Body $body -ContentType "application/json"
```
