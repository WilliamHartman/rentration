INSERT INTO users
(given_name, family_name, email, img, auth_id)
VALUES
($1, $2, $3, $4, $5)
RETURNING *;