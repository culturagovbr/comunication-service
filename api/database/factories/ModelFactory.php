<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

$factory->define(App\Models\Usuario::class, function (Faker\Generator $faker) {
    return [
        'nome' => $faker->name,
        'is_ativo' => $faker->boolean,
        'is_admin' => $faker->boolean,
        'email' => $faker->email,
        'password' => password_hash('12345', PASSWORD_BCRYPT),
        'created_at' => $faker->dateTime,
        'cpf' => $faker->randomNumber(11),
    ];
});

$factory->define(App\Models\Plataforma::class, function (Faker\Generator $faker) {
    return [
        'descricao' => $faker->name,
        'is_ativo' => $faker->boolean,
        'created_at' => $faker->dateTime
    ];
});

$factory->define(App\Models\Sistema::class, function (Faker\Generator $faker) {
    return [
        'descricao' => $faker->name,
        'url' => $faker->url,
        'is_ativo' => $faker->boolean,
        'created_at' => $faker->dateTime
    ];
});

$factory->define(App\Models\Mensagem::class, function (Faker\Generator $faker) {
    return [
        'titulo' => $faker->name,
        'descricao' => $faker->text,
        'sistema_id' => factory(\App\Models\Sistema::class)->create()->sistema_id,
        'autor_id' => factory(\App\Models\Usuario::class)->create()->usuario_id,
        'is_ativo' => $faker->boolean,
        'created_at' => $faker->dateTime
    ];
});

$factory->define(App\Models\Notificacao::class, function (Faker\Generator $faker) {
    return [];
});
