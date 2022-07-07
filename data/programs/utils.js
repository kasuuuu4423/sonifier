export const map = (target_num, in_min, in_max, out_min, out_max) => {
	const input_diff = in_max - target_num;
	const input_range = in_max - in_min;
	const output_range = out_max - out_min;
	const percentage = input_diff / input_range;
	const out_diff = percentage * output_range;
	const rs = out_max - out_diff;
    
	return rs;
}