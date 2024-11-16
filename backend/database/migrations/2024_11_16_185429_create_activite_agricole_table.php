<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('activite_agricole', function (Blueprint $table) {
            $table->id();
            $table->string('type');
            $table->text('description');
            $table->date('date');
            $table->unsignedBigInteger('id_culture');
            $table->foreign('id_culture')->references('id')->on('cultures')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('activite_agricole');
    }
};
