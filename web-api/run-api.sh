curl -i 'http://localhost:3000/users'

echo
echo
echo


curl \
  --silent \
  -i \
  -d '{"name": "test", "age": 2, "email": "test@mail.com"}' \
  -X POST \
 'http://localhost:3000/users'
