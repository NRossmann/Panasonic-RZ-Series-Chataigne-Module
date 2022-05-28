function log(message) {
  script.log(": INFO : " + message);
}

function makelength(value, length, vorzeichen) {
  vorz = "+";
  if (value < 0) vorz = "-";
  absvalue = Math.abs(value);
  isLen = Math.ceil(Math.log10(absvalue + 1));
  if (isLen == 0) isLen = 1;
  str = "";
  for (i = 1; i <= length - isLen; i++) {
    str += "0";
  }
  if (!vorzeichen) return str + absvalue;
  else return vorz + str + absvalue;
}

function init() {
  log("Panasonic RZ-Series module loaded");
}

function moduleParameterChanged(param) {
  log(param.name + " parameter changed, new value: " + param.get());
}

function moduleValueChanged(value) {
  log(value.name + " Value changed, new value: " + value.get());
}

function send_command(command) {
  local.send("AD00;" + command + "");
}

function power(value) {
  send_command(value);
}

function shutter_shutter(value) {
  send_command("OSH:" + value);
}

function shutter_fade(in_out, duration) {
  send_command("VXX:SEFS" + in_out + "=" + duration);
}

function testpattern(value) {
  send_command("OTS:" + value);
}

function inputSelect(input) {
  send_command("IIS:" + input);
}

function picture_mode(mode) {
  send_command("VPM:" + mode);
}

function picture_contrast(value) {
  value = value + 32;
  if (value < 10) value = "00" + value;
  else value = "0" + value;
  send_command("VCN:" + value);
}

function picture_brightness(value) {
  value = value + 32;
  if (value < 10) value = "00" + value;
  else value = "0" + value;
  send_command("VCN:" + value);
}

function picture_color(value) {
  value = value + 32;
  if (value < 10) value = "00" + value;
  else value = "0" + value;
  send_command("VCN:" + value);
}

function picture_tint(value) {
  value = value + 32;
  if (value < 10) value = "00" + value;
  else value = "0" + value;
  send_command("VCN:" + value);
}

function picture_color_temp(temp) {
  send_command("OTE:" + temp);
}

function picture_color_temp_u1(value) {
  if (value < 100) value = "0" + value;
  send_command("VXX:NCGS1=" + value);
}

function picture_color_temp_u2(value) {
  if (value < 100) value = "0" + value;
  send_command("VXX:NCGS3=" + value);
}

function picture_white_gain(value) {
  if (value < 10) value = "0" + value;
  send_command("VWH:" + value);
}

function picture_gamma(temp) {
  send_command("VGA:" + temp);
}

function picture_gamma_u1(value) {
  if (value < 100) value = "0" + value;
  send_command("VXX:NCGS1=" + value);
}

function picture_daylight_view(view) {
  send_command("VXX:DLVI0=+" + view);
}

function picture_sharpness(value) {
  if (value < 10) value = "00" + value;
  else value = "0" + value;
  send_command("VXX:NCGS1=" + value);
}

function picture_noise_reduction(red) {
  send_command("VNS:" + red);
}

function picture_dyn_contrast(con) {
  send_command("OAI:" + con);
}

function picture_tv(value) {
  send_command("VSG:" + value);
}

function picture_wb(lh, color, valueL, valueH) {
  if (lh == 0) value = valueL + 128;
  else value = valueH;

  value = makelength(value, 3, false);

  if (lh == 0) {
    if (color == 0) send_command("VOR:" + value);
    else if (color == 1) send_command("VOG:" + value);
    else if (color == 2) send_command("VOB:" + value);
  } else {
    if (color == 0) send_command("VHR:" + value);
    else if (color == 1) send_command("VHG:" + value);
    else if (color == 2) send_command("VHB:" + value);
  }
}

function picture_system(value) {
  send_command("ORF:" + value);
}

function position_geometry(mode) {
  send_command("OZT:" + mode);
}

function position_keystone(module, keystone, subkeystone, linearity) {
  if (module == "OSK") value = subkeystone;
  else if (module == "OKS") value = keystone;
  else if (module == "VLI") value = linearity;
  if (module == "OSK") value += 63;
  else value += 127;

  if (value < 10) value = "00" + value;
  else if (value < 100) value = "0" + value;

  send_command(module + ":" + value);
}

function position_gkeystone(module, ltr, vk, hk, vb, hb) {
  if (module == "VXX:GMKS0=+") value = ltr;
  else if (module == "VXX:GMKI8=") value = vk;
  else if (module == "VXX:GMKI9=") value = hk;
  else if (module == "VXX:GMKI4=") value = vb;
  else if (module == "VXX:GMKI7=") value = hb;

  if (module == "VXX:GMKI4=" || module == "VXX:GMKI7=") {
    if (value < 0) vorz = "-";
    else vorz = "+";

    if (value < 10) value = "0000" + value;
    else if (value < 10) value = "000" + value;
    else if (value < 100) value = "00" + value;
    else if (value < 1000) value = "0" + value;
    value = vorz + value;
  }

  send_command(module + ":" + value);
}

function position_keystone(module, keystone, subkeystone, linearity) {
  if (module == "OSK") value = subkeystone;
  else if (module == "OKS") value = keystone;
  else if (module == "VLI") value = linearity;
  if (module == "OSK") value += 63;
  else value += 127;

  if (value < 10) value = "00" + value;
  else if (value < 100) value = "0" + value;

  send_command(module + ":" + value);
}

function position_gcurved(module, ltr, vk, hk, vb, hb, va, ha, mar) {
  if (module == "VXX:GMCS0=+") value = ltr;
  else if (module == "VXX:GMCS8=") value = vk;
  else if (module == "VXX:GMCS9=") value = hk;
  else if (module == "VXX:GMCI2=") value = vb;
  else if (module == "VXX:GMCI6=") value = hb;
  else if (module == "VXX:GMCI3=") value = va;
  else if (module == "VXX:GMCI7=") value = ha;
  else if (module == "VXX:GMCIA=+") value = mar;

  if (
    module != "VXX:GMCS0=+" &&
    module != "VXX:GMCS8=" &&
    module != "VXX:GMCS9="
  ) {
    if (value < 0) {
      vorz = "-";
      value = Math.abs(value);
    } else vorz = "+";

    if (value < 10) value = "0000" + value;
    else if (value < 100) value = "000" + value;
    else if (value < 1000) value = "00" + value;
    else if (value < 10000) value = "0" + value;
    value = vorz + value;
  }

  send_command(module + ":" + value);
}

function position_gcorner(corner, vh, value) {
  if (position_gcorner_check(corner, vh, value)) {
    if (value < 0) {
      vorz = "-";
      value = Math.abs(value);
    } else vorz = "+";

    if (value < 10) value = "0000" + value;
    else if (value < 100) value = "000" + value;
    else if (value < 1000) value = "00" + value;
    else if (value < 10000) value = "0" + value;
    value = vorz + value;

    if (vh == 1) {
      if (corner == 1) send_command("VXX:GMFI1=" + value);
      else if (corner == 2) send_command("VXX:GMFI2=" + value);
      else if (corner == 3) send_command("VXX:GMFI3=" + value);
      else if (corner == 4) send_command("VXX:GMFI4=" + value);
      else if (corner == 5) send_command("VXX:GMFI5=" + value);
    } else {
      if (corner == 1) send_command("VXX:GMFI6=" + value);
      else if (corner == 2) send_command("VXX:GMFI7=" + value);
      else if (corner == 3) send_command("VXX:GMFI8=" + value);
      else if (corner == 4) send_command("VXX:GMFI9=" + value);
      else if (corner == 5) send_command("VXX:GMFIA=" + value);
    }
  } else {
    util.showMessageBox(
      "Falsche Werte",
      "Die Werte sind nicht in den Grenzen für die Ecke"
    );
  }
}

function position_gcorner_check(corner, vh, value) {
  if (vh == 1) {
    if (corner == 1 || corner == 2) {
      if (value > 300) return false;
      else if (value < 0) return false;
      else return true;
    } else if (corner == 3 || corner == 4) {
      if (value > 0) return false;
      else if (value < -300) return false;
      else return true;
    } else if (corner == 5) {
      if (value > 127) return false;
      else if (value < -127) return false;
      else return true;
    }
  } else {
    if (corner == 1 || corner == 3) {
      if (value > 480) return false;
      else if (value < 0) return false;
      else return true;
    } else if (corner == 2 || corner == 4) {
      if (value > 0) return false;
      else if (value < -480) return false;
      else return true;
    } else if (corner == 5) {
      if (value > 127) return false;
      else if (value < -127) return false;
      else return true;
    }
  }
}

function position_shift(v_h, valueV, valueH) {
  if (v_h == "V") value = valueV;
  else value = valueH;
  if (value < 10) value = "000" + value;
  else if (value < 100) value = "00" + value;
  else if (value < 1000) value = "0" + value;
  send_command("VT" + v_h + ": " + value);
}

function position_aspect(asp) {
  send_command("VSE:" + asp);
}

function position_zoom(v_h, value) {
  if (shift < 100) value = "0" + value;
  send_command("OZ" + v_h + ": " + con);
}

function position_zoom_lock(lock) {
  send_command("OZS:" + lock);
}

function position_zoom_mode(mode) {
  send_command("OZT:" + mode);
}

function position_clockPhase(value) {
  send_command("VCP:" + makelength(value, 3, false));
}

function advanced_blanking(side, up, down, right, left) {
  if (side == "DBU:") value = up;
  else if (side == "DBB:") value = down;
  else if (side == "DBR:") value = right;
  else if (side == "DBL:") value = left;

  if (value < 10) value = "00" + value;
  else if (value < 100) value = "0" + value;

  send_command(side + value);
}

function advanced_blending(command) {
  send_command(command);
}

function advanced_blending_onoff(side, value) {
  send_command(side + value);
}

function advanced_blending_start(side, up, down, right, left) {
  if (side == "VEU:") value = up;
  else if (side == "VEB:") value = down;
  else if (side == "VER:") value = right;
  else if (side == "VEL:") value = left;

  if (value < 10) value = "000" + value;
  else if (value < 100) value = "00" + value;
  else if (value < 1000) value = "0" + value;

  send_command(side + value);
}

function advanced_blending_width(side, up, down, right, left) {
  if (side == "VXX:EUWI0=+") value = up;
  else if (side == "VXX:EBWI0=+") value = down;
  else if (side == "VXX:ERWI0=+") value = right;
  else if (side == "VXX:ELWI0=+") value = left;

  if (value < 10) value = "0000" + value;
  else if (value < 100) value = "000" + value;
  else if (value < 1000) value = "00" + value;
  else if (value < 10000) value = "0" + value;

  send_command(side + value);
}

function advanced_blending_marker(value) {
  send_command("VGM:" + value);
}

function advanced_raster(vh, position) {
  position += 5000;
  send_command(vh + position);
}

function advanced_inres(mode, value) {
  value = makelength(value, 4, false);
  send_command(mode + value);
}

function advanced_clamp(value) {
  send_command("VLT:" + makelength(value, 3, false));
}

function display_color(command) {
  send_command(command);
}

function display_color_3(w, tp, Rr, Rg, Rb, Gr, Gg, Gb, Br, Bg, Bb) {
  Rr = makelength(Rr, 4, false);
  Rg = makelength(Rg, 4, false);
  Rb = makelength(Rb, 4, false);
  Gr = makelength(Gr, 4, false);
  Gg = makelength(Gg, 4, false);
  Gb = makelength(Gb, 4, false);
  Br = makelength(Br, 4, false);
  Bg = makelength(Bg, 4, false);
  Bb = makelength(Bb, 4, false);
  send_command("VMR:" + Rr + "," + Rg + "," + Rb);
  send_command("VMG:" + Gr + "," + Gg + "," + Gb);
  send_command("VMB:" + Br + "," + Bg + "," + Bb);
  send_command("VMW:" + makelength(w, 4, false));
  send_command("VXX:CATI0=+0000" + tp);
}

function display_color_7(
  w,
  tp,
  Rr,
  Rg,
  Rb,
  Gr,
  Gg,
  Gb,
  Br,
  Bg,
  Bb,
  Cr,
  Cg,
  Cb,
  Mr,
  Mg,
  Mb,
  Yr,
  Yg,
  Yb
) {
  Rr = makelength(Rr, 4, false);
  Rg = makelength(Rg, 4, false);
  Rb = makelength(Rb, 4, false);
  Gr = makelength(Gr, 4, false);
  Gg = makelength(Gg, 4, false);
  Gb = makelength(Gb, 4, false);
  Br = makelength(Br, 4, false);
  Bg = makelength(Bg, 4, false);
  Bb = makelength(Bb, 4, false);
  Cr = makelength(Cr, 4, false);
  Cg = makelength(Cg, 4, false);
  Cb = makelength(Cb, 4, false);
  Mr = makelength(Mr, 4, false);
  Mg = makelength(Mg, 4, false);
  Mb = makelength(Mb, 4, false);
  Yr = makelength(Yr, 4, false);
  Yg = makelength(Yg, 4, false);
  Yb = makelength(Yb, 4, false);
  send_command("VXX:C7CS0=" + Rr + "," + Rg + "," + Rb);
  send_command("VXX:C7CS1=" + Gr + "," + Gg + "," + Gb);
  send_command("VXX:C7CS2=" + Br + "," + Bg + "," + Bb);
  send_command("VXX:C7CS3=" + Cr + "," + Cg + "," + Cb);
  send_command("VXX:C7CS4=" + Mr + "," + Mg + "," + Mb);
  send_command("VXX:C7CS5=" + Yr + "," + Yg + "," + Yb);
  send_command("VXX:C7CS6=" + makelength(w, 4, false));
  send_command("VXX:CATI1=+0000" + tp);
}

function display_correction_mode(value) {
  send_command("VCM:" + value);
}

function display_correction(color, value) {
  value = makelength(value, 5, true);
  send_command(color + value);
}

function display_format(ratio) {
  send_command("VSF:" + ratio);
}

function display_position(h_v, positionV, positionH) {
  if (h_v == "V") position = positionV;
  else position = positionH;
  send_command("VXX:" + h_v + "SPI0=" + position);
}

function display_rotation(rotaion) {
  send_command("VXX:IROI1=+0000" + rotaion);
}

function display_osd_active(value) {
  send_command("OOS:" + value);
}

function display_osd_position(updown, rightleft) {
  value = 0;
  if (updown == 0) {
    if (rightleft == 0) value = 1;
    else if (rightleft == 1) value = 2;
    else if (rightleft == 2) value = 3;
  } else if (updown == 1) {
    if (rightleft == 0) value = 4;
    else if (rightleft == 1) value = 5;
    else if (rightleft == 2) value = 6;
  } else if (updown == 2) {
    if (rightleft == 0) value = 7;
    else if (rightleft == 1) value = 8;
    else if (rightleft == 2) value = 9;
  }
  send_command("ODP:" + value);
}

function display_osd_rotation(value) {
  send_command("VXX:OSRI1=+0000" + value);
}

function display_shutter_startup(command) {
  send_command(command);
}

function display_multiSync(module, mode, contrast, shutter) {
  if (module == "VXX:MPSI1=+000") send_command(module + mode);
  else if (module == "VXX:CSYI1=+000") send_command(module + contrast);
  else if (module == "VXX:SSYI1=+000") send_command(module + shutter);
}

function setup_projectionMethod(method) {
  send_command("OIL:" + method);
}

function setup_altitude(value) {
  send_command("OFM:" + value);
}

function setup_lampSelect(value) {
  send_command("LPM:" + value);
}

function setup_lampPower(value) {
  send_command("OLP:" + value);
}

function basic_auto() {
  send_command("VXX:LNSI1=+00001");
}

function basic_lens(what, speed) {
  send_command(what + speed);
}

function basic_keys(command) {
  send_command(command);
}

function basic_freeze(value) {
  send_command("OFZ:" + value);
}
