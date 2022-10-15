<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHomesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('homes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->string("title");
            $table->string("resume", 100);
            $table->string("description", 10000);
            $table->float("price");
            $table->string("period_type")->nullable()->default("");
            $table->foreignId('home_type_id')->constrained();
            $table->foreignId('home_purchase_type_id')->constrained();
            $table->integer("square_meter");
            $table->string("construction_year");
            $table->boolean("garage")->default(0);
            $table->boolean("pets")->default(0);
            $table->boolean("elevator")->default(0);
            $table->boolean("terrace")->default(0);
            $table->boolean("garden")->default(0);
            $table->boolean("smoker")->default(0);
            $table->boolean("furnished")->default(0);
            $table->boolean("heating")->default(0);
            $table->integer("rooms")->default(0);
            $table->integer("bedrooms")->default(0);
            $table->integer("bathrooms")->default(0);
            $table->string("town");
            $table->string("address");
            $table->string("postal_code");
            $table->string("block")->nullable()->default("");
            $table->string("floor")->nullable()->default(0);
            $table->string("door")->nullable()->default(0);
            $table->float("lat")->nullable()->default(0);
            $table->float("lng")->nullable()->default(0);
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
        Schema::dropIfExists('homes');
    }
}
