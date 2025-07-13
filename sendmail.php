<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "farhanfauzansetiawan@gmail.com";
    $subject = "Pesan dari Portfolio";
    $name = $_POST["name"];
    $email = $_POST["email"];
    $subjectForm = $_POST["subject"];
    $message = $_POST["message"];
    $body = "Nama: $name\nEmail: $email\nSubject: $subjectForm\nPesan:\n$message";
    $headers = "From: $email";

    if (mail($to, $subject, $body, $headers)) {
        echo "success";
    } else {
        echo "error";
    }
}
?> 